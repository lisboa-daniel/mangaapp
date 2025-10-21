

interface LogoProps {
    className? : string
}

export function Logo({ className }: LogoProps) {
    return (

        <h1 className={`${className} dela-gothic-one-regular text-2xl`}>
            Manga App
        </h1>
    )
}