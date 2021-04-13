import css from './Campo.module.css'
import clsx from 'clsx'

function Campo(props) {
    return (
        <div className={css.campo}>
            <div className={css.campoTop}>
                <div>
                    <h1>Relatórios do serviço de campo</h1>  
                </div>
                <form action="">
                    <div>
                        <div>
                            <label htmlFor="mesSel">Selecionar mês/ano</label>
                            <select className="form-select" aria-label="Default select example" id="mesSel">
                                <option>12/2021</option>
                                <option>12/2020</option>
                                <option>12/2019</option>
                                <option>12/2018</option>
                                <option>12/2017</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="groupSel">Selecionar grupo</label>
                            <select className="form-select" aria-label="Default select example" id="groupSel">
                                <option>Grupo 1</option>
                                <option>Grupo 2</option>
                                <option>Grupo 3</option>
                                <option>Grupo 4</option>
                                <option>Grupo 5</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary"><i className="fas fa-search"></i>Pesquisar</button>
                    </div>
                </form>
            </div>

            <div className={css.campoMiddle}>
                <table className={'table table-striped table-bordered table-hover ' + css.tabela}>
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Horas</th>
                            <th scope="col">Publicações</th>
                            <th scope="col">Vídeos</th>
                            <th scope="col">Revisitas</th>
                            <th scope="col">Estudos</th>
                            <th scope="col">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button className="btn btn-warning"><i className="fas fa-edit"></i></button>
                                <button className="btn btn-danger"><i className={'fas fa-trash ' + css.iconTrash}></i></button>     
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button className="btn btn-warning"><i className="fas fa-edit"></i></button>
                                <button className="btn btn-danger"><i className={'fas fa-trash ' + css.iconTrash}></i></button>     
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button className="btn btn-warning"><i className="fas fa-edit"></i></button>
                                <button className="btn btn-danger"><i className={'fas fa-trash ' + css.iconTrash}></i></button>     
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className={css.campoBottom}>
                <h1>Totais</h1>
                <div className={css.campoBottomRow}>
                    <h2>Publicadores</h2>
                    <div>
                        <div className={clsx(css.card, css.card1)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-paperclip"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>20</h4>
                                <h3>Publicações</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card2)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-video"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>20</h4>
                                <h3>Vídeos</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card3)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-clock"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>20</h4>
                                <h3>Horas</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card4)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-phone-alt"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>20</h4>
                                <h3>Revisitas</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card5)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-book"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>20</h4>
                                <h3>Estudos</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css.campoBottomRow}>
                    <h2>Pioneiros Auxiliares</h2>
                    <div>
                        <div className={clsx(css.card, css.card1)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-paperclip"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>20</h4>
                                <h3>Publicações</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card2)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-video"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>20</h4>
                                <h3>Vídeos</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card3)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-clock"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>20</h4>
                                <h3>Horas</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card4)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-phone-alt"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>20</h4>
                                <h3>Revisitas</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card5)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-book"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>20</h4>
                                <h3>Estudos</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css.campoBottomRow}>
                    <h2>Pioneiros Regulares</h2>
                    <div>
                        <div className={clsx(css.card, css.card1)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-paperclip"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>20</h4>
                                <h3>Publicações</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card2)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-video"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>20</h4>
                                <h3>Vídeos</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card3)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-clock"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>20</h4>
                                <h3>Horas</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card4)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-phone-alt"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>20</h4>
                                <h3>Revisitas</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card5)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-book"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>20</h4>
                                <h3>Estudos</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Campo