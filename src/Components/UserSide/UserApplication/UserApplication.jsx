import { BoxInputs, BoxTable} from "./style";
import { useState, useEffect, useContext} from "react";
import { makeStyles } from '@mui/styles';

import React from 'react';
import Axios  from "axios";
import  Select  from "@mui/material/Select"
import  MenuItem  from "@mui/material/MenuItem"
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';

import { MainStyles } from "../../../style";
import { HeaderArea } from "../../Header/Header";
import { AuthContext } from "../../../Context/AuthContext";
import { UserCard } from "../UserCard/UserCard";
import { UserHeadTable } from "../UserHeadTable/UserHeadTable";
import { Toaster, toast  } from 'react-hot-toast';


export function UserApplication() {

    const {user} = useContext(AuthContext)
    const usuario = user.name

    const [listTables, setListTables] = useState([])
    const [valueInput, setValueInput] = useState('')
    const [selecSystem, setSelecSystem] = useState('')
    const [selecInstancie, setSelecInstancie] = useState('')
    const [selecStatus] = useState('Pendente')
    
    // Regex
    
    const handleValues = (value) => {

        if(value.target.value === "") {

            setValueInput('')

        } else {

            
            const valor = value.target.value;
            const cleanedValue = valor.replace(/[^\d]/g, '');
            const formattedValue = `${cleanedValue.substr(0,1)}.${cleanedValue.substr(1,7)}-${cleanedValue.substr(8,2)}.${cleanedValue.substr(10,4)}.${cleanedValue.substr(14,1)}.${cleanedValue.substr(15,2)}.${cleanedValue.substr(17,4)}`;
            const trimmedString = formattedValue.replace(/\s+/g, '');
            setValueInput(trimmedString);
           
        }     
    }; 
                
    const registerDatas = () => {
    
        if(valueInput === "" || selecSystem === "" || selecInstancie === "") {
            
            // alert("Preencha Todos os Campos Corretamente")

            toast('Preencha Todos os Campos Corretamente',

                {
                    style: {
                    borderRadius: '10px',
                    background: '#fff',
                    color: '#ad2d2d',
                    },
                }
            );
            
        } else {

            const registroExistente = listTables.find((item) => {

                return item.numero === valueInput && item.sistema === selecSystem && item.instancia === selecInstancie;

            });

            if (registroExistente) {

                toast('Este Processo Já Existe',

                {
                    style: {
                    borderRadius: '10px',
                    background: '#ad2d2d',
                    color: '#fff',
                    },
                }
            );
            
            } else {
                    
                Axios.post("http://localhost:3001/userregister", {
                    
                    numero: valueInput,  
                    usuario: usuario,  
                    sistema: selecSystem,  
                    instancia: selecInstancie,  
                    status: selecStatus
                    
                }).then((res) => {

                    console.log(res.numero);

                    setListTables([
                    
                        ...listTables,
                        
                        {
                            numero: valueInput,  
                            usuario: usuario,  
                            sistema: selecSystem,  
                            instancia: selecInstancie,  
                            status: selecStatus 
                        } 
                ])
                setValueInput("")
                setSelecInstancie("")
                setSelecSystem("")

                }).then(() => {

                    Axios.get("http://localhost:3001/userrequest", {

                        params: {
                            usuario: usuario,
                        }

                    }).then((res) => {
                        setListTables(res.data)
                        console.log(res.data)
                    })
                    
                })
                toast('Dados Enviados com Sucesso',
    
                    {
                        style: {
                        borderRadius: '10px',
                        background: '#12963a',
                        color: '#fff',
                        },
                    }
                );
            }

        }
                   
    }
    

    useEffect(() => {
        Axios.get("http://localhost:3001/userrequest", {

            params: {
                usuario: usuario,
            }

        }).then((res) => {
            setListTables(res.data)
            console.log(res.data)
        })
    }, [])

   
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };

    
        
    
    const handleInstancie = event => {
        setSelecInstancie(prevSelecInstancie => prevSelecInstancie = event.target.value)
    }
    const handleSystem = event => {
        setSelecSystem(prevSelecSystem => prevSelecSystem = event.target.value)
    }


    const useStyles = makeStyles( () => ({
        input: {
            backgroundColor: 'red',
            width: '17rem',
            height: '1rem',
            paddingLeft: '8px',
            fontSize: '14px',
        }
        
    }))

    const classes = useStyles()
         
   
    return (
        <>
            <HeaderArea/>
            <MainStyles>
            
                <BoxInputs>
                    <div className="BoxInputs">

                        
                        <TextField
                            type="text"
                            className="input" 
                            label="Número do Processo"
                            value={valueInput}
                            onChange={handleValues}
                            // inputProps={{ maxLength: 27  }}
                            size="small"
                        />

                        
                            
                        <FormControl size="small" className="input" >
                            <InputLabel id="demo-multiple-checkbox-label">Sistema</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                
                                value={listTables.sistema || selecSystem}
                                onChange={handleSystem}
                                input={<OutlinedInput label="Sistema" />}
                                MenuProps={MenuProps}
                                classes={classes.input }
                                required
                            >
                                <MenuItem value=''>Selecione</MenuItem>
                                <MenuItem value='PJE'>PJE</MenuItem>
                                <MenuItem value='PROJUDI'>PROJUDI</MenuItem>
                                <MenuItem value='E-PROC'>E-PROC</MenuItem>
                                <MenuItem value='E-SAJ'>E-SAJ</MenuItem>
                                <MenuItem value='SISTEMA PRÓPRIO'>SISTEMA PRÓPRIO</MenuItem>

                            </Select>
                        </FormControl>

                        <FormControl size="small" className="input" >
                            <InputLabel id="demo-multiple-checkbox-label">Instancia</InputLabel>

                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                
                                value={listTables.instancia || selecInstancie}
                                onChange={handleInstancie}
                                input={<OutlinedInput label="Instancia" />}
                                MenuProps={MenuProps}
                                classes={classes.input }
                                
                            >
                                <MenuItem value=''>Selecione</MenuItem>
                                <MenuItem value='Primeira'>Primeira</MenuItem>
                                <MenuItem value='Segunda'>Segunda</MenuItem>
                                <MenuItem value='JF'>JF</MenuItem>
                                <MenuItem value='TRF'>TRF</MenuItem>
                                <MenuItem value='STF'>STF</MenuItem>
                                <MenuItem value='STJ'>STJ</MenuItem>

                            </Select>

                        </FormControl>
                        
                    </div>

                    <div className="BoxButtons">

                        <button onClick={registerDatas}>Incluir</button>

                    </div>
                    
                </BoxInputs>

                <BoxTable>
                    
                    <UserHeadTable/>

                    {/* <SpaceCard> */}

                        {
                            listTables && listTables.map((datas) => (
                            <>
                                <UserCard 
                                    key={datas.idprocessos}
                                    id={datas.idprocessos}
                                    numbers={datas.numero}
                                    instancie={datas.instancia}
                                    system={datas.sistema}
                                    status={datas.status}
                                    statusColor={datas.status}
                                    listTables={listTables}
                                    setListTables={setListTables}

                                    valueInput={valueInput}
                                    selecInstancie={selecInstancie}
                                    selecSystem={selecSystem}
                                    selecStatus={selecStatus}
                                    
                                    setValueInput={setValueInput}
                                    setSelecInstancie={setSelecInstancie}
                                    setSelecSystem={setSelecSystem}
                                />
                                    
                            </>
                            ))
                        }

                </BoxTable>

                <Toaster
                    position="bottom-left"
                    reverseOrder={false}
                />

            </MainStyles>
        </>
    )
    
}