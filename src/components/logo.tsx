import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { type FC } from "react";
import { AspectRatio } from "~/components/ui/aspect-ratio";

interface Props {
    url:string,
    imageUrl:StaticImageData|string
}
 
const Logo: FC<Props> = ({url,imageUrl}) => {
    return ( 
        <Link href={url} prefetch={false}>
            <div className="flex items-center w-32 h-8">
                <AspectRatio
                ratio={16/9}
                className="grid place-items-center"
                >
                    <Image
                    priority
                    src={imageUrl}
                    alt="Logo"
                    />    
                </AspectRatio>
            </div>
        </Link>
     );
}
 
export default Logo;