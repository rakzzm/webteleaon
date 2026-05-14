import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FormatFileProps =
  | "doc"
  | "pdf"
  | "md"
  | "mdx"
  | "csv"
  | "xls"
  | "xlsx"
  | "txt"
  | "ppt"
  | "pptx"
  | "zip"
  | "rar"
  | "tar"
  | "gz"
  | "code"
  | "html"
  | "js"
  | "jsx"
  | "tsx"
  | "css"
  | "json"
  | "img"
  | "png"
  | "jpg"
  | "jpeg"
  | "video";

type FileCardProps = {
  formatFile: FormatFileProps;
  className?: string;
};

const colorBannerMap: Record<FormatFileProps, string> = {
  doc: "bg-blue-500 text-white",
  pdf: "bg-red-500 text-white",
  md: "bg-neutral-600 text-white",
  mdx: "bg-neutral-600 text-white",
  txt: "bg-gray-500 text-white",
  csv: "bg-teal-700 text-white",
  xls: "bg-emerald-600 text-white",
  xlsx: "bg-emerald-600 text-white",
  ppt: "bg-orange-500 text-white",
  pptx: "bg-orange-500 text-white",
  zip: "bg-purple-500 text-white",
  rar: "bg-purple-600 text-white",
  tar: "bg-yellow-600 text-white",
  gz: "bg-yellow-700 text-white",
  html: "bg-orange-600 text-white",
  js: "bg-yellow-600 text-white",
  jsx: "bg-blue-600 text-white",
  css: "bg-blue-600 text-white",
  json: "bg-yellow-500 text-white",
  tsx: "bg-blue-600 text-white",
  code: "bg-orange-600 text-white",
  img: "bg-pink-500 text-white",
  png: "bg-neutral-600 text-white",
  jpg: "bg-green-700 text-white",
  jpeg: "bg-green-700 text-white",
  video: "bg-green-700 text-white"
};

function Line({ className }: { className: string }) {
  return <div className={cn("rounded-full bg-slate-900/10", className)} />;
}

function DefaultPlaceholder() {
  return (
    <div className="space-y-1.5">
      <Line className="h-0.5 w-1/2 bg-slate-900/20" />
      <div className="flex gap-1">
        <Line className="h-0.5 w-1/3" />
        <Line className="h-0.5 w-1/3" />
      </div>
      <div className="flex gap-1">
        <Line className="h-0.5 w-1/2" />
        <Line className="h-0.5 w-1/3" />
      </div>
      <div className="flex gap-1">
        <Line className="h-0.5 w-1/3" />
        <Line className="h-0.5 w-1/3" />
      </div>
      <div className="flex gap-1">
        <Line className="h-0.5 w-1/3" />
        <Line className="h-0.5 w-1/2" />
      </div>
      <Line className="h-0.5 w-1/3" />
    </div>
  );
}

function TablePlaceholder() {
  return (
    <div className="space-y-0.5">
      <div className="grid grid-cols-3 gap-0.5">
        <div className="h-2 bg-slate-900/20" />
        <div className="h-2 bg-slate-900/20" />
        <div className="h-2 bg-slate-900/20" />
      </div>
      <div className="grid grid-cols-3 gap-0.5">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="h-2 bg-slate-900/5" />
        ))}
      </div>
    </div>
  );
}

function CodePlaceholder({ formatFile }: { formatFile: FormatFileProps }) {
  const isJson = formatFile === "json";

  return (
    <div className="space-y-1 font-mono">
      <div className="flex items-center gap-1 text-[6px] text-slate-900/40">{isJson ? "{" : "<"}</div>
      <div className="flex items-center gap-1 pl-1.5">
        <div className="h-0.75 w-3 rounded-full bg-sky-400/60" />
        <div className="h-0.75 w-4 rounded-full bg-emerald-400/60" />
      </div>
      <div className="flex items-center gap-1 pl-1.5">
        <div className="h-0.75 w-4 rounded-full bg-sky-400/60" />
        <div className="h-0.75 w-2 rounded-full bg-slate-900/15" />
      </div>
      <div className="flex items-center gap-1 pl-1.5">
        <div className="h-0.75 w-3 rounded-full bg-slate-900/15" />
        <div className="h-0.75 w-4 rounded-full bg-sky-400/60" />
      </div>
      <div className="flex items-center gap-1 text-[6px] text-slate-900/40">{isJson ? "}" : "/>"}</div>
    </div>
  );
}

function ArchivePlaceholder() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="flex overflow-hidden rounded-full">
          <div className={cn("size-1.5", index % 2 === 0 ? "bg-slate-900/20" : "bg-slate-900/5")} />
          <div className={cn("size-1.5", index % 2 === 0 ? "bg-slate-900/5" : "bg-slate-900/20")} />
        </div>
      ))}
    </div>
  );
}

function MediaPlaceholder({ type }: { type: "img" | "video" | "ppt" }) {
  return (
    <>
      <div className="mb-1.5 space-y-1 rounded border border-slate-900/10 bg-slate-900/5 p-1">
        <div className="flex justify-center gap-1">
          {type === "video" ? (
            <div className="size-0 border-y-[5px] border-l-8 border-y-transparent border-l-green-400/70" />
          ) : (
            <div className={cn("size-3 rounded-sm", type === "ppt" ? "bg-orange-400/50" : "bg-yellow-400/50")} />
          )}
        </div>
        <Line className="mx-auto h-0.75 w-4 bg-slate-900/15" />
        <Line className="mx-auto h-0.75 w-8 bg-slate-900/15" />
      </div>
    </>
  );
}

function MarkdownPlaceholder() {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1">
        <div className="text-[10px] font-bold text-slate-900/30">#</div>
        <Line className="h-0.5 w-6 bg-slate-900/20" />
      </div>
      <Line className="h-0.5 w-1/3" />
      <Line className="h-0.5 w-7" />
      <Line className="h-0.5 w-8" />
      <Line className="h-0.5 w-4" />
      <Line className="h-0.5 w-1/3" />
    </div>
  );
}

function getPlaceholder(formatFile: FormatFileProps): ReactNode {
  if (formatFile === "md" || formatFile === "mdx") return <MarkdownPlaceholder />;
  if (formatFile === "xls" || formatFile === "xlsx" || formatFile === "csv") return <TablePlaceholder />;
  if (formatFile === "zip" || formatFile === "rar" || formatFile === "tar" || formatFile === "gz") return <ArchivePlaceholder />;
  if (formatFile === "ppt" || formatFile === "pptx") return <MediaPlaceholder type="ppt" />;
  if (formatFile === "img" || formatFile === "png" || formatFile === "jpg" || formatFile === "jpeg") return <MediaPlaceholder type="img" />;
  if (formatFile === "video") return <MediaPlaceholder type="video" />;
  if (["html", "js", "jsx", "tsx", "code", "css", "json"].includes(formatFile)) return <CodePlaceholder formatFile={formatFile} />;
  return <DefaultPlaceholder />;
}

export function FileCard({ formatFile, className }: FileCardProps) {
  return (
    <div aria-hidden className={cn("relative h-fit w-fit", className)}>
      <div className={cn("absolute -right-2 bottom-1.5 z-20 rounded px-1.5 py-0.5 text-[8px] font-medium uppercase", colorBannerMap[formatFile])}>
        {formatFile}
      </div>
      <div className="relative z-10 h-18 w-14 space-y-3 rounded-md bg-white p-2 shadow-[0_18px_45px_rgba(15,23,42,0.15)] ring-1 ring-slate-200">
        {getPlaceholder(formatFile)}
      </div>
    </div>
  );
}
