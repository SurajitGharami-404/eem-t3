import Image from "next/image";
import { type PropsWithChildren, type FC } from "react";
import Logo from "~/assets/Original.png";
import { AspectRatio } from "~/components/ui/aspect-ratio";

type Props = PropsWithChildren;

const AuthTemplate: FC<Props> = ({ children }) => {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-3 px-6 py-4">
      <div
        className="
      flex w-full flex-col items-center rounded 
      border border-border bg-background p-12 shadow-md
      md:w-4/5 md:flex-row
      "
      >
        <section className="flex-1 grid place-items-center">
          <div className="h-48 w-48 rounded-full overflow-hidden">
           <AspectRatio className="w-full h-full" ratio={1/1}>
           <Image src={Logo} alt="EEM Logo" fetchPriority="high"/>
           </AspectRatio>
          </div>
        </section>
        <section className="flex-1">{children}</section>
      </div>
    </main>
  );
};

export default AuthTemplate;