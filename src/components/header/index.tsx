import style from "./style.module.scss"

export const Header = () => {
    return (
        <header className={style.container}>
            <div className={style.wrapper}>
                <h2 className={style.title}>
                    {"LIST"}
                </h2>
            </div>
        </header>
    )
}
