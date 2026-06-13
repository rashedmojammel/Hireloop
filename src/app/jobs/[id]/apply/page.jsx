import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import Link from 'next/link';
import { getPlanById } from '@/lib/api/plans';

const ApplyPage = async ({ params }) => {
    const { id } = await params;

    const user = await getUserSession();
    if (!user) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }

    // Role guard
    if (user.role !== 'seeker') {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
                <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
                    <div className="w-11 h-11 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                    </div>
                    <h3 className="text-base font-semibold text-zinc-100 mb-2">Employer accounts can't apply</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                        You're signed in as a company. To apply for jobs, sign in with a job seeker account instead.
                    </p>
                    <Link
                        href="/auth/signin"
                        className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium rounded-xl transition-colors"
                    >
                        Switch account
                    </Link>
                </div>
            </div>
        );
    }

    const [applications, job] = await Promise.all([
        getApplicationsByApplicant(user.id),
        getJobById(id),
    ]);

    const plan = await getPlanById(user?.plan || 'seeker_free');

    const applicationCount = applications?.length || 0;
    const hasReachedLimit = applicationCount >= plan.maxApplicationsPerMonth;
    const usagePercent = Math.min((applicationCount / plan.maxApplicationsPerMonth) * 100, 100);

    const trackColor =
        hasReachedLimit
            ? 'bg-red-500'
            : usagePercent > 66
            ? 'bg-amber-500'
            : 'bg-indigo-500';

    const statColor =
        hasReachedLimit ? 'text-red-400' : 'text-indigo-400';

    const remaining = plan.maxApplicationsPerMonth - applicationCount;

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 py-14 px-4">
            <div className="max-w-2xl mx-auto space-y-6">

                {/* Quota tracker */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                            <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-500 mb-1">
                                Applications this month
                            </p>
                            <p className="text-xl font-semibold leading-none">
                                <span className={statColor}>{applicationCount}</span>
                                <span className="text-sm font-normal text-zinc-500 ml-1">
                                    / {plan.maxApplicationsPerMonth} used
                                </span>
                            </p>
                        </div>
                        <span className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 bg-zinc-800 border border-zinc-700 rounded-full px-2.5 py-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                            </svg>
                            {plan.name}
                        </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden mb-3">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${trackColor}`}
                            style={{ width: `${usagePercent}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <p className="text-xs text-zinc-500">
                            {hasReachedLimit
                                ? 'Quota full — resets next month'
                                : `${remaining} application${remaining !== 1 ? 's' : ''} remaining`}
                        </p>
                        <Link
                            href="/plans"
                            className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors whitespace-nowrap"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7a18.894 18.894 0 01-3.818 1.357M10.3 8.52a18.89 18.89 0 011.356-3.817m0 0a3 3 0 113.882 3.882 3 3 0 01-3.882-3.882z" />
                            </svg>
                            Upgrade for unlimited
                        </Link>
                    </div>
                </div>

                {/* Form area */}
                {hasReachedLimit ? (
                    <div className="bg-zinc-900/50 border border-dashed border-zinc-800 rounded-2xl p-12 text-center">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-3">
                            <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        </div>
                        <h4 className="text-sm font-semibold text-zinc-200 mb-1">Monthly limit reached</h4>
                        <p className="text-sm text-zinc-500 max-w-xs mx-auto leading-relaxed mb-5">
                            You've used all {plan.maxApplicationsPerMonth} applications for this cycle. Upgrade to keep applying, or wait until next month.
                        </p>
                        <Link
                            href="/plans"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors"
                        >
                            See upgrade options
                        </Link>
                    </div>
                ) : (
                    <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                        {/* Job context */}
                        {job && (
                            <div className="mb-4 px-1">
                                <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-500 mb-1">
                                    Now applying
                                </p>
                                <h1 className="text-lg font-semibold text-zinc-100">{job.title}</h1>
                                {job.company && (
                                    <p className="text-sm text-zinc-400 mt-0.5">{job.company}</p>
                                )}
                            </div>
                        )}

                        {/* Form card with subtle indigo accent border */}
                        <div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden ring-1 ring-indigo-500/10">
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
                            <JobApply applicant={user} job={job} />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ApplyPage;