import Link from "next/link";

import { DarkModeToggle } from "./DarkMode";

interface Props {
  title: string;
  logo?: string;
}

const AppBar: React.FC<Props> = ({ title, logo }: Props) => {
  return (
    <div className="h-7 w-full flex justify-between mb-4 p-4">
      <div id="left" className="cursor-pointer">
        <Link href="/">
          <div className="bg-primary-dark text-white-regular text-center h-7 w-7 text-xl rounded-full">
            {logo ? (
              <img className="rounded-full" src={logo} />
            ) : (
              title?.charAt(0)
            )}
          </div>
        </Link>
      </div>
      <div id="right" className="text-right">
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default AppBar;
