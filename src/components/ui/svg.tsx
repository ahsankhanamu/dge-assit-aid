import * as React from "react";
import { cn } from "@/lib/utils";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  viewBox?: string;
  className?: string;
  children?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  fill?: string;
  stroke?: string;
  strokeWidth?: string | number;
  ariaLabel?: string;
  ariaHidden?: boolean;
  focusable?: boolean;
  dataIcon?: string;
}

const SVG: React.FC<SVGProps> = ({
  viewBox = "64 64 896 896",
  className,
  children,
  width = "1em",
  height = "1em",
  fill = "currentColor",
  stroke,
  strokeWidth,
  ariaLabel,
  ariaHidden = true,
  focusable = false,
  dataIcon,
  ...props
}) => {
  return (
    <svg
      viewBox={viewBox}
      className={cn("inline-block", className)}
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      focusable={focusable}
      data-icon={dataIcon}
      {...props}
    >
      {children}
    </svg>
  );
};

interface SvgWrapperProps extends React.SVGProps<SVGSVGElement> {
  ariaLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

export const SvgImgWrapper: React.FC<SvgWrapperProps> = (SvgWrapperProps) => {
  const { className, children, role, ariaLabel, ...rest } = SvgWrapperProps;
  return (
    <span
      role={role || "img"}
      aria-label={ariaLabel || "icon"}
      className={cn("icon-check steps-finish-icon", className)}
      {...(rest as unknown as React.HTMLAttributes<HTMLSpanElement>)}
    >
      {children}
    </span>
  );
};

export const CheckIconBase = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="check"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
  </svg>
);
