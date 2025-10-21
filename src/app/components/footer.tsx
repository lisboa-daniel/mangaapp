import { CircleRounded } from "@mui/icons-material";


interface Footerprops {
    className? : string
}

export function Footer() {
    return (
        <footer className="bg-black flex flex-row items-center justify-center w-full min-h-[32px]">
            <p className="mr-2">Manga App ® 2025 </p>
            <CircleRounded className="mr-1" sx={{width: '8px', height: '8px'}}></CircleRounded> 
            <a className="link" href="https://github.com/lisboa-daniel/mangaapp">Github</a>
        </footer>
    );
}