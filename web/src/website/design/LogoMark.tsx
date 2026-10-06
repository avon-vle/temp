export const LogoMark = ({
  className = "",
}: {
  readonly className?: string;
}) => (
  <span
    aria-hidden="true"
    className={`inline-block aspect-[705/416] bg-current ${className}`}
    style={{
      mask: "url(/avon-logo.svg) center / contain no-repeat",
      WebkitMask: "url(/avon-logo.svg) center / contain no-repeat",
    }}
  />
);
