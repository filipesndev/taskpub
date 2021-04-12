import css from './Footer.module.css'

function Footer(props) {
    return (
        <div className={css.footer}>
            <h1>©TaskPub, é um sistema criado para treinamento por <a href="https://github.com/filipesndev">Filipe Eduardo</a>.</h1>
        </div>
    )
}

export default Footer