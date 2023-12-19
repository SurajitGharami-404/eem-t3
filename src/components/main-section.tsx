function MainSection({children}:{children:React.ReactNode}) {
    return ( 
        <main className="flex-1  mx-auto p-6 space-y-8">
            {children}
        </main>
     );
}

export default MainSection;