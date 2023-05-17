import * as React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';
import Axios from 'axios';

import { CardBox } from "./style";
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { Toaster, toast  } from 'react-hot-toast';

// interface PropsString {
//     statusColor: string;
//     numbers: string;
//     system: string;
//     instancie: string;
//     status: string;
//     id: number;

// }

export function UserCard(props) {

    const {user} = useContext(AuthContext)
    const usuario = user.name

    // const [open, setOpen] = React.useState(false);


    const [editValues, setEditValues] = useState({
        id: props.id,
        numbers: props.numbers,
        instancie: props.instancie,
        system: props.system,
      })

    const statusClass = 
        props.statusColor == "Pendente" ? "yellow" : 
        props.statusColor == "Concluído" ? "green" : 
        props.statusColor == "Não Concluído" ? "red" : ""

    // const handleOpen = () => {
    //     setOpen(true);
    //     };



    const deleteTable = () => {
        

        Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
            
            props.setListTables(

                props.listTables.filter((value) => {
        
                    return value.id != editValues.id
                    
                })
            )
                
            
        }).then(() => {
                
            props.setListTables([
    
                ...props.listTables,
        
                {
                    numbers: props.numbers,
                    instancie: props.instancie,
                    system: props.system,
                    status: props.status,
                }
        
            ])
                
        }).then(() => {
        
            Axios.get("http://localhost:3001/userrequest", {
                params: {
                    usuario: usuario,
                }
            }).then((res) => {
                console.log(res);
                props.setListTables(res.data)
        
            })
            toast('Excluído',
    
                    {
                        style: {
                        borderRadius: '10px',
                        background: '#ad2d2d',
                        color: '#fff',
                        },
                    }
                );
        })


    }
    

    return (
        <>



            <CardBox id={props.id} className={statusClass} >
                <td>{props.numbers}</td>
                <td>{props.system}</td>
                <td>{props.instancie}</td>
                <td className={statusClass}>{props.status}</td>

                <td onClick={deleteTable}>
                    <Button
                        // className='deleteButton' 
                        style={{
                            color: 'red',
                        }}
                    >
                        <HighlightOffIcon fontSize="medium" style={{ color: 'red' }} />
                        Excluir
                    </Button>
                </td>

            </CardBox>
                                    
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
        </>
    )
}