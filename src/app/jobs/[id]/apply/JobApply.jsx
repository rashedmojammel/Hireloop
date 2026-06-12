'use client';
import React, { useState } from 'react';
import { Form, Button, TextField, Label, Input, Description, FieldError } from '@heroui/react';
import { ArrowRight, Link, FileText, LayoutHeaderCells } from '@gravity-ui/icons';
// import { submitApplication } from '@/lib/actions/applications';

const JobApply = ({ job, applicant }) => {
    const [formData, setFormData] = useState({
        resumeLink: '',
        portfolioLink: '',
        additionalNotes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submissionData = {
            jobId: job?._id,
            jobTitle: job?.jobTitle,
            companyName: job?.companyName,
            applicantId: applicant?.id,
            applicantName: applicant?.name,
            applicantEmail: applicant?.email,
            ...formData
        };
        console.log('Submitting Application:', submissionData);
        const res = await submitApplication(submissionData);
        if (res.insertedId) {
            alert('Application submitted successfully!');
            setFormData({ resumeLink: '', portfolioLink: '', additionalNotes: '' });
        }
    };

    const initials = applicant?.name
        ? applicant.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
        : '?';

    return (
        <div className="w-full bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl">
            <div className="max-w-[520px] mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-7">

                {/* Badge + Title */}
                <div className="mb-5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-md mb-3">
                        <FileText className="w-3.5 h-3.5" />
                        Application
                    </span>
                    <h2 className="text-[18px] font-semibold text-zinc-900 dark:text-zinc-50 leading-snug">
                        Apply for {job?.title || 'this position'}
                    </h2>

                    {/* Applicant identity row */}
                    {applicant?.name && (
                        <div className="flex items-center gap-2.5 mt-3 px-3 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-lg">
                            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-[11px] font-semibold text-blue-700 dark:text-blue-300 shrink-0">
                                {initials}
                            </div>
                            <div className="min-w-0">
                                <p className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200 leading-none">{applicant.name}</p>
                                <p className="text-[12px] text-zinc-400 dark:text-zinc-500 mt-0.5 truncate">{applicant.email}</p>
                            </div>
                            <svg className="w-4 h-4 text-emerald-500 ml-auto shrink-0" viewBox="0 0 16 16" fill="none">
                                <path d="M13 5L6.5 11.5 3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    )}
                </div>

                <hr className="border-zinc-100 dark:border-zinc-800 mb-5" />

                {/* Form */}
                <Form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

                    {/* Resume Link */}
                    <TextField isRequired name="resumeLink" className="w-full">
                        <Label className="flex items-center gap-1.5 text-[13px] font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                            <FileText className="w-3.5 h-3.5 text-zinc-400" />
                            Resume link
                            <span className="text-red-500 ml-0.5">*</span>
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                                <Link className="w-3.5 h-3.5" />
                            </span>
                            <Input
                                type="url"
                                placeholder="https://drive.google.com/…"
                                value={formData.resumeLink}
                                onChange={handleChange}
                                className="w-full pl-8 pr-3 py-2 text-[13px] rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
                            />
                        </div>
                        <Description className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1.5">
                            Google Drive, Notion, Dropbox — any public link works.
                        </Description>
                        <FieldError className="text-[11px] text-red-500 mt-1" />
                    </TextField>

                    {/* Portfolio Link */}
                    <TextField name="portfolioLink" className="w-full">
                        <Label className="flex items-center gap-1.5 text-[13px] font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                            <Link className="w-3.5 h-3.5 text-zinc-400" />
                            Portfolio / website
                            <span className="text-[11px] font-normal text-zinc-400 ml-1">(optional)</span>
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                                <Link className="w-3.5 h-3.5" />
                            </span>
                            <Input
                                type="url"
                                placeholder="https://yourportfolio.com"
                                value={formData.portfolioLink}
                                onChange={handleChange}
                                className="w-full pl-8 pr-3 py-2 text-[13px] rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
                            />
                        </div>
                        <Description className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1.5">
                            GitHub, Behance, or personal site.
                        </Description>
                    </TextField>

                    {/* Notes */}
                    <TextField name="additionalNotes" className="w-full">
                        <Label className="flex items-center gap-1.5 text-[13px] font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                            <LayoutHeaderCells className="w-3.5 h-3.5 text-zinc-400" />
                            Message to the team
                            <span className="text-[11px] font-normal text-zinc-400 ml-1">(optional)</span>
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-zinc-400">
                                <LayoutHeaderCells className="w-3.5 h-3.5" />
                            </span>
                            <textarea
                                name="additionalNotes"
                                rows={4}
                                placeholder="Anything you'd like the hiring team to know…"
                                value={formData.additionalNotes}
                                onChange={handleChange}
                                className="w-full pl-8 pr-3 py-2 text-[13px] rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition resize-none"
                            />
                        </div>
                    </TextField>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-3 pt-4 mt-1 border-t border-zinc-100 dark:border-zinc-800">
                        <Button
                            type="reset"
                            onClick={() => setFormData({ resumeLink: '', portfolioLink: '', additionalNotes: '' })}
                            className="px-4 py-2 text-[13px] font-medium text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition"
                        >
                            Clear form
                        </Button>
                        <Button
                            type="submit"
                            className="flex items-center gap-2 px-5 py-2 text-[13px] font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                        >
                            Submit application
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                    </div>
                </Form>

            </div>
        </div>
    );
};

export default JobApply;