import React from "react"
import { cn } from "@/lib/utils"

// Heading components
export function H1({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)} {...props}>{children}</h1>
}

export function H2({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)} {...props}>{children}</h2>
}

export function H3({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)} {...props}>{children}</h3>
}

export function H4({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props}>{children}</h4>
}

// Paragraph
export function P({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...props}>{children}</p>
}

// Blockquote
export function Blockquote({ children, className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)} {...props}>{children}</blockquote>
}

// Lists
export function UL({ children, className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>{children}</ul>
}

export function OL({ children, className, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return <ol className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)} {...props}>{children}</ol>
}

export function LI({ children, className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("", className)} {...props}>{children}</li>
}

// Inline code
export function InlineCode({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <code className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", className)} {...props}>{children}</code>
}

// Lead text
export function Lead({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xl text-muted-foreground", className)} {...props}>{children}</p>
}

// Large text
export function Large({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-lg font-semibold", className)} {...props}>{children}</div>
}

// Small text
export function Small({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <small className={cn("text-sm font-medium leading-none", className)} {...props}>{children}</small>
}

// Muted text
export function Muted({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props}>{children}</p>
}

// Table components
export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
}

export function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("[&_tr]:border-b", className)} {...props} />
}

export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)} {...props} />
}

export function TableHead({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className)} {...props} />
}

export function TableCell({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
}

export function TableCaption({ className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return <caption className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
} 