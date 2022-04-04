const Container = ({children}) => {
    return (
        <section className="max-w-[1440px] px-8 md:px-2 lg:px-8 mx-auto">
            {children}
        </section>
    )
}

export default Container;