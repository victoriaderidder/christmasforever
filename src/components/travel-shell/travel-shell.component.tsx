import { FC, ReactNode } from "react";

interface TravelShellProps {
  appClassName: string;
  appHeaderClassName: string;
  children: ReactNode;
}

export const TravelShell: FC<TravelShellProps> = ({
  appClassName,
  appHeaderClassName,
  children,
}) => {
  return (
    <div className={appClassName}>
      <div className={appHeaderClassName}>
        <div className="journey">{children}</div>
      </div>
    </div>
  );
};
