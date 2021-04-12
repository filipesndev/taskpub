import css from './CadastrosPublicadores.module.css'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import UfSelect from './UfSelect'
import FamiliaSelect from './FamiliaSelect'
import GrupoSelect from './GrupoSelect'
import { useState, useEffect } from 'react'
import axios from '../../../config/index'
import Swal from 'sweetalert2'

const initialData = {
    nome: '',
    apelido: '',
    endereco: '',
    numero_end: '',
    complemento_end: '',
    bairro: '',
    cidade: '',
    uf: '',
    cep: '',
    ponto_ref: '',
    email: '',
    sexo: '',
    situacao: '',
    data_nascimento: '',
    data_batismo: '',
    data_publicador: '',
    data_pioneiro_reg: '',
    observacao: '',
    ungido: false,
    chefe_familia: false,
    anciao: false,
    servo_min: false,
    pioneiro_reg: false,
    pioneiro_aux: false,
    superint_grupo: false,
    ajudante_grupo: false,
    grupo_campo_id: '',
    familia_id: ''
}

function CadastrosPublicadores(props) {

    const [data, setData] = useState(initialData)
    const history = useHistory()
    const routeParams = useParams()

    const query = new URLSearchParams(useLocation().search)
    const view = query.get('v') === 't'
    
    const onChange = e => {
        const name = e.target.name
        const value = e.target.value
        setData({
            ...data,
            [name]: value
        })
        console.log(data)
    }

    const changeCheck = e => {
        const {name, checked} = e.target
        setData({
            ...data,
            [name]: checked
        })
        console.log(data)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (routeParams.id) {
                console.log('ola')
                const fields = {...data}
                delete fields.grupo_campo
                delete fields.familia
                await axios.put('/publicadores/' + routeParams.id, fields)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Publicador atualizado!',
                    showConfirmButton: false,
                    timer: 1200
                })
            } else {
                await axios.post('/publicadores', data)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Publicador adicionado!',
                    showConfirmButton: false,
                    timer: 1200
                })
                setData(initialData)
            }
        } catch (error) {
            alert('Não foi possivel adicionar o publicador')
            console.log(error)
        }
    }

    const CancelClick = e => {
        return (
            history.push("/cadastros/publicadores")
        )
    }

    function trataData(obj) {
        const newObj = {}
        for (const prop in obj) {
            newObj[prop] = obj[prop] === null ? '' : obj[prop]
        }
        if (newObj.data_nascimento) {
            newObj.data_nascimento = newObj.data_nascimento.substr(0,10)
        }
        if (newObj.data_batismo) {
            newObj.data_batismo = newObj.data_batismo.substr(0,10)
        }
        if (newObj.data_publicador) {
            newObj.data_publicador = newObj.data_publicador.substr(0,10)
        }
        if (newObj.data_pioneiro_reg) {
            newObj.data_pioneiro_reg = newObj.data_pioneiro_reg.substr(0,10)
        }
        return newObj
    }

    useEffect(() => {
        const loadPub = async () => {
            try {
                const resp = await axios.get('/publicadores/' + routeParams.id)
                const dataCliente = trataData(resp.data)
                setData(dataCliente)
            } catch (error) {
                console.log(error)
            }
        }
        
        if (routeParams.id) {
            loadPub()
        } else {
            setData(initialData)
            
        } 

    }, [routeParams.id])

    return (
        <div className={css.CadPublicador}>
            
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className={'col-md-6 form-group ' + css.nome}>
                            <label htmlFor="nome">Nome</label>
                            <input type="text" onChange={onChange} name="nome" value={data.nome} className="form-control" id="nome" disabled={view}/>
                        </div>
                        <div className={'col-md-6 form-group ' + css.apelido}>
                            <label htmlFor="apelido">Apelido</label>
                            <input type="text" onChange={onChange} name="apelido" value={data.apelido} className="form-control" id="apelido" disabled={view}/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className={'col-md-3 form-group ' + css.cep}>
                            <label htmlFor="cep">CEP</label>
                            <div className={'input-group ' + css.cepInput}>
                                <input type="text" onChange={onChange} name="cep" value={data.cep} className="form-control"  id="cep" aria-describedby="btnsearch" disabled={view}/>
                                <button className="btn btn-primary" type="button" id="btnsearch" disabled={view}><i className="fas fa-search"></i></button>
                            </div>
                        </div>


                        <div className={'col-md-6 form-group ' + css.endereco}>
                            <label htmlFor="endereco">Endereço</label>
                            <input type="text" onChange={onChange} name="endereco" value={data.endereco} className="form-control" id="endereco" disabled={view}/>
                        </div>
                        <div className={'col-md-3 form-group ' + css.numero_da_casa}>
                            <label htmlFor="numero_da_casa">Número</label>
                            <input type="text" onChange={onChange} name="numero_end" value={data.numero_end} className="form-control" id="numero_da_casa" disabled={view}/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className={'col-md-4 form-group ' + css.complemento}>
                            <label htmlFor="complemento">Complemento</label>
                            <input type="text" onChange={onChange} name="complemento_end" value={data.complemento_end} className="form-control" id="complemento" disabled={view}/>
                        </div>
                        <div className={'col-md-3 form-group ' + css.cidade}>
                            <label htmlFor="cidade">Cidade</label>
                            <input type="text" onChange={onChange} name="cidade" value={data.cidade} className="form-control" id="cidade" disabled={view}/>
                        </div>
                        <div className={'col-md-4 form-group ' + css.bairro}>
                            <label htmlFor="bairro">Bairro</label>
                            <input type="text" onChange={onChange} name="bairro" value={data.bairro} className="form-control" id="bairro" disabled={view}/>
                        </div>
                        <div className={'col-md-1 ' + css.uf}>
                            <UfSelect onChange={onChange} data={data} view={view}/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className={'col-md-6 form-group ' + css.ponto_de_referencia}>
                            <label htmlFor="ponto_de_referencia">Ponto de Referência</label>
                            <input onChange={onChange} name="ponto_ref" value={data.ponto_ref} type="text" className="form-control" id="ponto_de_referencia" disabled={view}/>
                        </div>
                        <div className={'col-md-6 form-group ' + css.email}>
                            <label htmlFor="email">Email</label>
                            <input onChange={onChange} name="email" value={data.email} type="text" className="form-control" id="email" disabled={view}/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className={'col-md-3 form-group ' + css.sexo}>
                            <label htmlFor="sexo">Sexo</label>
                            <select onChange={onChange} name="sexo" value={data.sexo} className="form-control" id="sexo" disabled={view}>
                                <option value={''}></option>
                                <option value={'M'}>Masculino</option>
                                <option value={'F'}>Feminino</option>
                            </select>
                        </div>
                        <div className={'col-md-3 form-group ' + css.situacao}>
                            <label htmlFor="situacao">Situação</label>
                            <select onChange={onChange} name="situacao" value={data.situacao} className="form-control" id="situacao" disabled={view}>
                                <option value={''}></option>
                                <option value={'AT'}>Ativo</option>
                                <option value={'IN'}>Inativo</option>
                            </select>
                        </div>

                        <div className={'col-md-3 form-group ' + css.grupo}>
                            <GrupoSelect onChange={onChange} data={data} view={view}/>
                        </div>

                        <div className={'col-md-3 form-group ' + css.familia}>
                            <FamiliaSelect onChange={onChange} data={data} view={view}/>
                        </div>

                    </div>

                    <div className="row mb-3">
                        <div className={'col-md-3 form-group ' + css.data_de_nascimento}>
                            <label htmlFor="data_de_nascimento">Data de Nascimento</label>
                            <input onChange={onChange} name="data_nascimento" value={data.data_nascimento} type="date" className="form-control" id="data_de_nascimento" disabled={view}/>
                        </div>
                        <div className={'col-md-3 form-group ' + css.data_de_publicador}>
                            <label htmlFor="data_de_publicador">Data de Publicador</label>
                            <input onChange={onChange} name="data_publicador" value={data.data_publicador} type="date" className="form-control" id="data_de_publicador" disabled={view}/>
                        </div>
                        <div className={'col-md-3 form-group ' + css.data_de_batismo}>
                            <label htmlFor="data_de_batismo">Data de Batismo</label>
                            <input onChange={onChange} name="data_batismo" value={data.data_batismo} type="date" className="form-control" id="data_de_batismo" disabled={view}/>
                        </div>
                        <div className={'col-md-3 form-group ' + css.data_de_pioneiro_regular}>
                            <label htmlFor="data_de_pioneiro_regular">Data de Pioneiro Regular</label>
                            <input onChange={onChange} name="data_pioneiro_reg" value={data.data_pioneiro_reg} type="date" className="form-control" id="data_de_pioneiro_regular" disabled={view}/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className={'col-md-12 ' + css.privilegios}>
                            <label>Privilégios</label>
                            <div className="form-group form-check">
                                <input onChange={changeCheck} type="checkbox" name="ungido" checked={data.ungido} className="form-check-input" id="ungido" disabled={view}/>
                                <label className="form-check-label" htmlFor="ungido">Ungido</label>
                            </div>
                            <div className="form-group form-check">
                                <input onChange={changeCheck} type="checkbox" name="chefe_familia" checked={data.chefe_familia} className="form-check-input" id="chefe_de_família" disabled={view}/>
                                <label className="form-check-label" htmlFor="chefe_de_família">Chefe de Família</label>
                            </div>
                            <div className="form-group form-check">
                                <input onChange={changeCheck} type="checkbox" name="anciao" checked={data.anciao} className="form-check-input" id="anciao" disabled={view}/>
                                <label className="form-check-label" htmlFor="anciao">Ancião</label>
                            </div>
                            <div className="form-group form-check">
                                <input onChange={changeCheck} type="checkbox" name="servo_min" checked={data.servo_min} className="form-check-input" id="servo_ministerial" disabled={view}/>
                                <label className="form-check-label" htmlFor="servo_ministerial">Servo Ministerial</label>
                            </div>
                            <div className="form-group form-check">
                                <input onChange={changeCheck} type="checkbox" name="pioneiro_reg" checked={data.pioneiro_reg} className="form-check-input" id="pioneiro_regular" disabled={view}/>
                                <label className="form-check-label" htmlFor="pioneiro_regular">Pioneiro Regular</label>
                            </div>
                            <div className="form-group form-check">
                                <input onChange={changeCheck} type="checkbox" name="pioneiro_aux" checked={data.pioneiro_aux} className="form-check-input" id="pioneiro_auxiliar" disabled={view}/>
                                <label className="form-check-label" htmlFor="pioneiro_auxiliar">Pioneiro Auxiliar</label>
                            </div>
                            <div className="form-group form-check">
                                <input onChange={changeCheck} type="checkbox" name="superint_grupo" checked={data.superint_grupo} className="form-check-input" id="superintendente_de_grupo" disabled={view}/>
                                <label className="form-check-label" htmlFor="superintendente_de_grupo">Superintendente de Grupo</label>
                            </div>
                            <div className="form-group form-check">
                                <input onChange={changeCheck} type="checkbox" name="ajudante_grupo" checked={data.ajudante_grupo} className="form-check-input" id="ajudante_de_grupo" disabled={view}/>
                                <label className="form-check-label" htmlFor="ajudante_de_grupo">Ajudante de Grupo</label>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className={'col-md-12 form-group ' + css.observacao}>
                            <label htmlFor="observacao">Observação</label>
                            <input onChange={onChange} name="observacao" value={data.observacao} type="text" className="form-control" id="observacao" disabled={view}/>
                        </div>
                    </div>
                    {view ? (
                        <div className={'col-md-12 ' + css.formBtn}>
                            <button onClick={CancelClick} type="button" className="btn btn-primary"><i className="fas fa-arrow-left"></i>Voltar</button>
                        </div> 
                    ) : (
                        <div className={'col-md-12 ' + css.formBtn}>
                            <button onClick={CancelClick} type="button" className="btn btn-danger"><i className="fas fa-times"></i>Cancelar</button>
                            <button type="submit" className="btn btn-success"><i className="fas fa-check"></i>Salvar</button>
                        </div>
                    ) }
                </form>
            
        </div>
    )
}

export default CadastrosPublicadores