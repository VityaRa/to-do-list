import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import style from './style.module.scss'

export const Modal = () => {
    const content = useSelector((state: RootState) => state.modal.content)
    return (
        <div className={style.container}>
            <div className={style.inner}>
                {content}
            </div>
        </div>
    )
}