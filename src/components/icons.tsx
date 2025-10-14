import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M4 4h10.5a4.5 4.5 0 1 1 0 9H4M4 4v16" fill="hsl(var(--primary))"></path>
      <path d="M4 4h10.5a4.5 4.5 0 1 1 0 9H4" stroke="hsl(var(--primary))"></path>
    </svg>
  );
}
