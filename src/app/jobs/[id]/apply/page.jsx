import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import Link from 'next/link';
import { ShieldExclamation, CircleInfo, Rocket } from '@gravity-ui/icons';
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
            <div className="w-full min-h-[80vh] flex items-center justify-center p-6 bg-zinc-950">
                <div className="max-w-sm w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center text-center gap-4">
                    <div className="w-11 h-11 bg-amber-950/60 border border-amber-900/40 text-amber-500 rounded-xl flex items-center justify-center">
                        <ShieldExclamation className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-[15px] font-semibold text-zinc-100 mb-1.5">Access restricted</h3>
                        <p className="text-[13px] text-zinc-500 leading-relaxed">
                            Only job seekers can apply for positions. Sign in with a seeker account to continue.
                        </p>
                    </div>
                    <Link
                        href="/auth/signin"
                        className="mt-1 text-[13px] font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-5 py-2 rounded-lg transition"
                    >
                        Switch account
                    </Link>
                </div>
            </div>
        );
    }

    const applications = await getApplicationsByApplicant(user.id);
    const plan = await getPlanById(user?.plan || 'seeker_free');
    const job = await getJobById(id);

    const applicationCount = applications?.length || 0;
    const hasReachedLimit = applicationCount >= plan.maxApplicationsPerMonth;
    const usagePercentage = Math.min((applicationCount / plan.maxApplicationsPerMonth) * 100, 100);

    const barColor = hasReachedLimit
        ? 'bg-red-500'
        : usagePercentage > 66
        ? 'bg-amber-500'
        : 'bg-blue-500';

    const remaining = plan.maxApplicationsPerMonth - applicationCount;

    return (
        <div className="w-full min-h-screen bg-zinc-950 text-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto space-y-4">

                {/* Quota tracker card */}
                <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6">

                    {/* Top row: stat + plan pill */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                        <div>
                            <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-600 mb-1.5">
                                Applications this month
                            </p>
                            <div className="flex items-baseline gap-1.5">
                                <span className={`text-3xl font-bold tracking-tight leading-none ${hasReachedLimit ? 'text-red-400' : 'text-zinc-100'}`}>
                                    {applicationCount}
                                </span>
                                <span className="text-base text-zinc-600 font-normal">
                                    / {plan.maxApplicationsPerMonth}
                                </span>
                            </div>
                            <p className={`text-[12px] mt-1 ${hasReachedLimit ? 'text-red-600' : 'text-zinc-600'}`}>
                                {hasReachedLimit
                                    ? 'Limit reached — upgrade to apply again'
                                    : `${remaining} remaining`}
                            </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[12px] text-zinc-400 bg-zinc-800/60 border border-zinc-700/60 px-3 py-1.5 rounded-full whitespace-nowrap shrink-0">
                            <span className="text-zinc-500">Plan:</span>
                            <strong className="text-zinc-200 font-medium">{plan.name}</strong>
                        </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-5">
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                                style={{ width: `${usagePercentage}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-1.5 text-[11px] text-zinc-700">
                            <span>{applicationCount} used</span>
                            <span>{plan.maxApplicationsPerMonth} limit</span>
                        </div>
                    </div>

                    {/* Upsell banner */}
                    <div className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
                        hasReachedLimit
                            ? 'bg-red-950/30 border border-red-900/30'
                            : 'bg-blue-950/20 border border-blue-900/20'
                    }`}>
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            hasReachedLimit
                                ? 'bg-red-950/60 text-red-400'
                                : 'bg-blue-950/60 text-blue-400'
                        }`}>
                            <Rocket className="w-3.5 h-3.5" />
                        </div>
                        <p className={`flex-1 text-[12.5px] leading-relaxed ${
                            hasReachedLimit ? 'text-red-400/80' : 'text-blue-400/80'
                        }`}>
                            {hasReachedLimit
                                ? "You've used all your applications. Upgrade to keep applying."
                                : "Need more applications? Premium unlocks unlimited submissions."}
                        </p>
                        <Link
                            href="/plans"
                            className={`text-[12px] font-medium px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                                hasReachedLimit
                                    ? 'bg-red-950/60 border border-red-800/40 text-red-300 hover:bg-red-900/40'
                                    : 'bg-blue-950/60 border border-blue-800/30 text-blue-300 hover:bg-blue-900/30'
                            }`}
                        >
                            {hasReachedLimit ? 'Upgrade now' : 'View plans'}
                        </Link>
                    </div>
                </div>

                {/* Form or locked state */}
                {hasReachedLimit ? (
                    <div className="bg-zinc-900/40 border border-dashed border-zinc-800 rounded-2xl p-10 flex flex-col items-center text-center gap-3">
                        <div className="w-10 h-10 bg-zinc-800/80 border border-zinc-700/50 text-zinc-600 rounded-xl flex items-center justify-center">
                            <CircleInfo className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-[14px] font-semibold text-zinc-300 mb-1">Application limit reached</h4>
                            <p className="text-[13px] text-zinc-600 max-w-xs leading-relaxed">
                                You've used all {plan.maxApplicationsPerMonth} applications for this month. Upgrade your plan to continue.
                            </p>
                        </div>
                        <Link
                            href="/plans"
                            className="inline-flex items-center gap-1.5 mt-1 text-[12.5px] font-medium text-blue-400 bg-blue-950/30 border border-blue-900/30 hover:bg-blue-950/50 px-4 py-2 rounded-lg transition"
                        >
                            View upgrade options
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </div>
                ) : (
                    <div className="animate-in fade-in-50 duration-300">
                        <JobApply applicant={user} job={job} />
                    </div>
                )}

            </div>
        </div>
    );
};

export default ApplyPage;