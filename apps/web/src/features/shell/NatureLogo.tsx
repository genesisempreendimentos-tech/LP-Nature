interface NatureLogoProps {
  light?: boolean
  className?: string
  markOnly?: boolean
}

export default function NatureLogo({
  light = false,
  className = "",
  markOnly = false,
}: NatureLogoProps) {
  return (
    <span
      className={`nature-logo ${light ? "nature-logo-light" : ""} ${markOnly ? "nature-logo-mark-only" : ""} ${className}`}
      role="img"
      aria-label="Nature Residencial"
    >
      <span className="nature-logo-mark">
        <img
          className="nature-logo-symbol nature-logo-base"
          src="/brand/nature-symbol.svg"
          alt=""
          width="48"
          height="48"
        />
        <img
          className="nature-logo-symbol nature-logo-color"
          src="/brand/nature-symbol.svg"
          alt=""
          width="48"
          height="48"
          aria-hidden="true"
        />
      </span>
      {!markOnly && (
        <span className="nature-logo-type">
          <img
            className="nature-logo-base"
            src="/brand/nature-wordmark.svg"
            alt=""
            width="162"
            height="15"
          />
          <img
            className="nature-logo-color"
            src="/brand/nature-wordmark.svg"
            alt=""
            width="162"
            height="15"
            aria-hidden="true"
          />
        </span>
      )}
    </span>
  )
}
