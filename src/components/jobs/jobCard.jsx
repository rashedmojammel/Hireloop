import React from "react";
import { Card, Link } from "@heroui/react";
import {
  MapPin,
  Briefcase,
  CircleDollar,
  ArrowRight,
} from "@gravity-ui/icons";

export default function JobCard({ job }) {
  // Guard clause in case the prop isn't passed or is loading
  if (!job) return null;

  // Format salary string safely (e.g., "160000" becomes "160k")
  const formatSalary = (amount) => {
    if (!amount) return "0";
    const numericAmount = parseInt(amount, 10);
    return numericAmount >= 1000 ? `${numericAmount / 1000}k` : amount;
  };

  const salaryRange =
    job.minSalary && job.maxSalary
      ? `$${formatSalary(job.minSalary)}–$${formatSalary(
          job.maxSalary
        )} / year`
      : "Salary Negotiable";

  // Safely extract the ID string depending on your MongoDB data hydration setup
  const jobId = job._id?.$oid || job._id;

  return (
    <Card
      className="
        group
        relative
        p-6
        w-full
        max-w-[440px]
        rounded-[32px]
        bg-gradient-to-br
        from-zinc-900
        via-zinc-900
        to-black
        border
        border-zinc-800
        text-zinc-100
        overflow-hidden
        shadow-xl
        hover:shadow-purple-500/20
        hover:border-purple-500/30
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      {/* Glow Effect */}
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <Card.Header className="flex flex-col items-start gap-4 p-0 pb-4">
        <div className="flex items-center gap-3">
          {job.companyLogo && (
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700">
              <img
                src={job.companyLogo}
                alt={`${job.companyName || "Company"} logo`}
                className="w-8 h-8 object-contain"
              />
            </div>
          )}

          <span className="text-lg font-semibold text-zinc-200">
            {job.companyName || "Confidential"}
          </span>
        </div>

        <Card.Title className="text-3xl font-bold tracking-tight text-white leading-tight">
          {job.jobTitle}
        </Card.Title>

        {job.responsibilities && (
          <Card.Description className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
            {job.responsibilities}
          </Card.Description>
        )}
      </Card.Header>

      {/* Content */}
      <Card.Content className="flex flex-col gap-5 p-0 py-4">
        <div className="flex flex-wrap gap-2">
          {/* Location */}
          {job.location && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 backdrop-blur-md border border-zinc-700/50">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-zinc-200">
                {job.location} {job.isRemote && "(Remote)"}
              </span>
            </div>
          )}

          {/* Job Type */}
          {job.jobType && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 backdrop-blur-md border border-zinc-700/50">
              <Briefcase className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-zinc-200 capitalize">
                {job.jobType}
              </span>
            </div>
          )}

          {/* Salary */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 backdrop-blur-md border border-zinc-700/50">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/15 border border-purple-500/20">
              <CircleDollar className="w-3 h-3 text-purple-400" />
            </div>

            <span className="text-sm text-zinc-200">{salaryRange}</span>
          </div>
        </div>

        {(job.requirements || job.benefits) && (
          <div className="pt-4 border-t border-zinc-800 text-xs text-zinc-400 space-y-2">
            {job.requirements && (
              <p>
                <span className="font-semibold text-zinc-300">
                  Requirements:
                </span>{" "}
                {job.requirements}
              </p>
            )}

            {job.benefits && (
              <p>
                <span className="font-semibold text-zinc-300">
                  Benefits:
                </span>{" "}
                {job.benefits}
              </p>
            )}
          </div>
        )}
      </Card.Content>

      {/* Footer */}
      <Card.Footer className="p-0 pt-5">
        <Link
          href={`/jobs/${jobId}`}
          className="
            inline-flex
            items-center
            gap-2
            px-5
            py-2.5
            rounded-full
            bg-purple-500/10
            border
            border-purple-500/20
            text-purple-300
            font-medium
            hover:bg-purple-500/20
            hover:border-purple-500/40
            transition-all
            duration-300
          "
          variant="light"
          disableRipple
        >
          Apply Now

          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Card.Footer>
    </Card>
  );
}