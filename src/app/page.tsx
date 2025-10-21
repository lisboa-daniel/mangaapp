import TabLink from "./components/tabLink";


export default function Home() {

  const links : Link[] = [
    {
        title: "List",
        href: "/list"
     
    },

    {
        title: "Profile",
        href: "/profile"
        
    },
    

];


  return (
    <main className="w-full flex justify-center p-12 min-h-[88vh]">
      <div className="w-full max-h-[480px] rounded-xl bg-lightbackground p-2">
          <p className="title text-2xl"> Welcome! </p>

          <p className="text-xl p-2">
            This is a webtool to store info about the manga you've read. Feel free to add information about the titles and note your statistics.
          </p>
      </div>

    
    </main>
  );
}
