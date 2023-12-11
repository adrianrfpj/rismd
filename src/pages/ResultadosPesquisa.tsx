import { Box, Typography, FormControl, Select, InputLabel, MenuItem, SelectChangeEvent, List, ListItem, Button, IconButton } from "@mui/material";
import { ArrowBack, FileOpen } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const ResultadosPesquisa: React.FC = () => {

    const queryParameters = new URLSearchParams(window.location.search)
    const titulo = queryParameters.get("titulo")
    const autor = queryParameters.get("autor")
    const orientador = queryParameters.get("orientador")
    const trilha = queryParameters.get("trilha")
    const tipo = queryParameters.get("tipo")

    interface Trabalho {
        id: string;
        titulo: string;
        autor: string;
        link: string;
        orientador: string;
        semestre: string;
        tipo: string;
        trilha: string;
    }

    const [order, setOrder] = useState('0');
    const [trabalhos, setTrabalhos] = useState<Trabalho[]>([]);
    const [refresh, setRefresh] = useState(false);

    const trabalhosCollectionRef = collection(db, 'trabalhos');

    const querySemestreAsc = query(trabalhosCollectionRef,
        orderBy('semestre', 'asc'),
        orderBy('titulo', 'asc'));
    const querySemestreDesc = query(trabalhosCollectionRef,
        orderBy('semestre', 'desc'),
        orderBy('titulo', 'asc'));
    const queryTituloAsc = query(trabalhosCollectionRef,
        orderBy('titulo', 'asc'),
        orderBy('semestre', 'desc'));
    const queryTituloDesc = query(trabalhosCollectionRef,
        orderBy('titulo', 'desc'),
        orderBy('semestre', 'desc'));
    var queryTrabalhos = querySemestreAsc;

    useEffect(() => {
        const getTrabalhos = async () => {
            try {
                

                switch (order) {
                    case '0':
                        queryTrabalhos = querySemestreDesc;
                        break;
                    case '1':
                        queryTrabalhos = querySemestreAsc;
                        break;
                    case '2':
                        queryTrabalhos = queryTituloAsc;
                        break;
                    case '3':
                        queryTrabalhos = queryTituloDesc;
                        break;
                }

                const data = await getDocs(queryTrabalhos);
                const filteredData = data.docs.map((doc) => ({
                    id: doc.id,
                    titulo: doc.data().titulo,
                    autor: doc.data().autor,
                    link: doc.data().link,
                    orientador: doc.data().orientador,
                    semestre: doc.data().semestre,
                    tipo: doc.data().tipo,
                    trilha: doc.data().trilha
                }));
                const refilteredData = filteredData.filter((trabalho) => {
                    console.log("TITULO >>>>>>>>> " + trabalho.titulo?.includes(titulo));
                    console.log("AUTOR >>>>>>>>> " + trabalho.autor?.includes(autor));
                    console.log("ORIENTADOR >>>>>>>>> " + trabalho.orientador?.includes(orientador));
                    console.log("TRILHA >>>>>>>>> " + trabalho.trilha?.includes(trilha));
                    console.log("TIPO >>>>>>>>> " + trabalho.tipo?.includes(tipo));
                    console.log(" ------------- ");
                    return (
                        (trabalho.titulo?.includes(titulo)) &&
                        (trabalho.autor?.includes(autor)) &&
                        (trabalho.orientador?.includes(orientador)) &&
                        (trabalho.trilha?.includes(trilha)) &&
                        (trabalho.tipo?.includes(tipo))
                    );
                });
                setTrabalhos(refilteredData);
                console.log("FILTERED DATA >>>>>>>>> " + refilteredData);
            } catch (error) {
                console.error(error);
            }
        }
        getTrabalhos();
    }, [order, refresh]);

    const handleChange = (event: SelectChangeEvent) => {
        setOrder(event.target.value as string);
        setRefresh(!refresh);
    };

    const navigateToPaginaInicial = useNavigate();

    const handleNavigateToPaginaInicial = () => {
        navigateToPaginaInicial('/pagina-inicial');
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            <Box display='flex' flexDirection='column' alignItems='center' gap='32px' width='1360px' padding='64px'>
                <Box display='flex' alignItems='center' alignSelf='stretch' gap='32px'>
                    <IconButton onClick={handleNavigateToPaginaInicial}><ArrowBack /></IconButton>
                    <Typography color="text.primary" variant="h4" flex='1 0 0'>Resultados da Pesquisa</Typography>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-label">Ordenar por:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={order}
                            label="Ordenar por:"
                            onChange={handleChange}
                        >
                            <MenuItem value='0'>Semestre [0-9]</MenuItem>
                            <MenuItem value='1'>Semestre [9-0]</MenuItem>
                            <MenuItem value='2'>Titulo [a-z]</MenuItem>
                            <MenuItem value='3'>Titulo [z-a]</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch', padding: '0', gap: '16px' }}>
                    {trabalhos.map((trabalho) => (
                        <ListItem sx={{ display: 'flex', flexDirection: 'column', alignSelf: 'stretch', padding: '0' }}>
                            <Box bgcolor='background.paper' display='flex' padding='16px' alignItems='center' justifyContent='space-between' gap='16px' alignSelf='stretch'>
                                <Box display='flex' flexDirection='column' alignItems='flex-start' alignSelf='stretch' flex='1 0 0'>
                                    <Typography color="text.primary" variant="subtitle1"><b>{trabalho.titulo}</b></Typography>
                                    <Box display='flex' alignItems='flex-start' gap='32px'>
                                        <Typography color="text.primary" variant="subtitle1">Autor: <b>{trabalho.autor}</b></Typography>
                                        <Typography color="text.primary" variant="subtitle1">Semestre: <b>{trabalho.semestre}</b></Typography>
                                        <Typography color="text.primary" variant="subtitle1">Trilha: <b>{trabalho.trilha}</b></Typography>
                                    </Box>
                                    <Box display='flex' alignItems='flex-start' gap='32px'>
                                        <Typography color="text.primary" variant="subtitle1">Orientador: <b>{trabalho.orientador}</b></Typography>
                                        <Typography color="text.primary" variant="subtitle1">Tipo: <b>{trabalho.tipo}</b></Typography>
                                    </Box>
                                </Box>
                                <Button href={trabalho.link} target="_blank" startIcon={<FileOpen />} variant="contained">Abrir Arquivo</Button>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}