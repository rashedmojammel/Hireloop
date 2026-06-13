import React from "react";
import { getJobById } from "@/lib/api/jobs";
import { Link } from "@heroui/react";
import {
  MapPin,
  Briefcase,
  CircleDollar,
  Calendar,
  ArrowUpRight,
} from "@gravity-ui/icons";

const Page = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  // Guard clause in case API fails or returns null
  if (!job) {
    return (
      <div className="w-full min-h-screen bg-zinc-950 flex flex-col justify-center items-center text-white p-6">
        <p className="text-zinc-400 text-lg">
          Job position could not be found or is no longer active.
        </p>
      </div>
    );
  }

  // Salary string utility formatter
  const formatSalary = (amount) => {
    if (!amount) return "0";
    const numericAmount = parseInt(amount, 10);
    return numericAmount >= 1000
      ? `${(numericAmount / 1000).toLocaleString()}k`
      : amount;
  };

  // Humanize standard date formats
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="relative min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                {job.companyLogo && (
                  <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg">
                    <img
                      src={job.companyLogo}
                      alt={`${job.companyName} Branding`}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-semibold text-zinc-200">
                    {job.companyName}
                  </h2>

                  <p className="text-sm text-purple-400 font-medium capitalize">
                    {job.jobCategory} Role
                  </p>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-none">
                {job.jobTitle}
              </h1>

              {/* Quick Info Pills */}
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm">
                  📍 {job.location}
                </div>

                <div className="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm capitalize">
                  💼 {job.jobType}
                </div>

                <div className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
                  💰{" "}
                  {job.minSalary && job.maxSalary
                    ? `$${formatSalary(job.minSalary)} - $${formatSalary(
                        job.maxSalary
                      )}`
                    : "Competitive"}
                </div>

                {job.isRemote && (
                  <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-sm">
                    Remote Friendly
                  </div>
                )}
              </div>
            </div>

            {/* Responsibilities */}
            <section className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-xl font-semibold text-white">
                Core Responsibilities
              </h3>

              <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
                {job.responsibilities ||
                  "No description responsibilities specified for this listing."}
              </p>
            </section>

            {/* Requirements */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                Requirements & Credentials
              </h3>

              <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6">
                <p className="text-zinc-300 leading-relaxed">
                  {job.requirements || "Standard industry standards apply."}
                </p>
              </div>
            </section>

            {/* Benefits */}
            {job.benefits && (
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  Benefits & Perks
                </h3>

                <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6">
                  <p className="text-zinc-300 leading-relaxed">
                    {job.benefits}
                  </p>
                </div>
              </section>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <aside
            className="
              bg-zinc-900/80
              backdrop-blur-xl
              border
              border-zinc-800
              rounded-[32px]
              p-7
              lg:sticky
              lg:top-8
              space-y-8
              shadow-2xl
            "
          >
            <h3 className="text-xl font-semibold text-white">
              Job Overview
            </h3>

            <div className="space-y-4">
              {/* Location */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-950/50 border border-zinc-800">
                <MapPin className="text-purple-400 w-5 h-5 mt-0.5 flex-shrink-0" />

                <div>
                  <span className="text-xs text-zinc-500 block">
                    Location
                  </span>

                  <span className="text-sm font-medium text-zinc-200">
                    {job.location}
                    {job.isRemote && (
                      <span className="ml-2 text-purple-400 text-xs">
                        (Remote Friendly)
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Job Type */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-950/50 border border-zinc-800">
                <Briefcase className="text-purple-400 w-5 h-5 mt-0.5 flex-shrink-0" />

                <div>
                  <span className="text-xs text-zinc-500 block">
                    Job Type
                  </span>

                  <span className="text-sm font-medium text-zinc-200 capitalize">
                    {job.jobType}
                  </span>
                </div>
              </div>

              {/* Salary */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-950/50 border border-zinc-800">
                <CircleDollar className="text-purple-400 w-5 h-5 mt-0.5 flex-shrink-0" />

                <div>
                  <span className="text-xs text-zinc-500 block">
                    Salary Range
                  </span>

                  <span className="text-sm font-medium text-zinc-200">
                    {job.minSalary && job.maxSalary
                      ? `$${formatSalary(job.minSalary)} - $${formatSalary(
                          job.maxSalary
                        )} / year`
                      : "Competitive Salary"}
                  </span>
                </div>
              </div>

              {/* Deadline */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-950/50 border border-zinc-800">
                <Calendar className="text-purple-400 w-5 h-5 mt-0.5 flex-shrink-0" />

                <div>
                  <span className="text-xs text-zinc-500 block">
                    Application Deadline
                  </span>

                  <span className="text-sm font-medium text-zinc-200">
                    {formatDate(job.deadline)}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
                <p className="text-zinc-500 text-xs">Category</p>
                <p className="text-white font-medium mt-1">
                  {job.jobCategory}
                </p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
                <p className="text-zinc-500 text-xs">Remote</p>
                <p className="text-white font-medium mt-1">
                  {job.isRemote ? "Yes" : "No"}
                </p>
              </div>
            </div>

            {/* Apply Button */}
            <Link
              href={`/jobs/${id}/apply`}
              className="
                w-full
                py-6
                rounded-2xl
                bg-gradient-to-r
                from-purple-600
                to-indigo-600
                hover:from-purple-500
                hover:to-indigo-500
                text-white
                font-semibold
                shadow-lg
                hover:shadow-purple-500/30
                transition-all
                duration-300
                flex
                items-center
                justify-center
                gap-2
              "
              endContent={<ArrowUpRight className="w-4 h-4" />}
            >
              Apply For This Job
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Page;