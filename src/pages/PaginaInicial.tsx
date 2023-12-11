import { Button, RadioGroup, TextField, FormControl, FormLabel, FormControlLabel, Radio, Typography, Box } from '@mui/material'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const PaginaInicial: React.FC = () => {

    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [orientador, setOrientador] = useState('');
    const [trilha, setTrilha] = useState('Sistemas');
    const [tipo, setTipo] = useState('Artigo');

    const navigateToResultadosPesquisa = useNavigate();

    const handleNavigateToResultadosPesquisa = () => {
        navigateToResultadosPesquisa('/resultados-pesquisa?titulo=' + titulo + '&autor=' + autor + '&orientador=' + orientador + '&trilha=' + trilha + '&tipo=' + tipo);
    }

    return (
        <Box height='100vh' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <Box bgcolor='background.paper' display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='32px' width='628px' padding='64px'>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' alignSelf='stretch' gap='8px'>
                    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' alignSelf='stretch' gap='0px'>
                        <Typography color="text.primary" variant="h4">Repositório Institucional</Typography>
                        <Typography color="text.primary" variant="h4">Sistemas e Mídias Digitais</Typography>
                    </Box>
                    <Typography color="text.primary" variant="h5">Trabalhos de Conclusão de Curso</Typography>
                </Box>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='left' alignSelf='stretch' gap='16px'>
                    <TextField id="titulo" label="Título do Trabalho" variant="outlined" fullWidth value={titulo}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setTitulo(event.target.value);
                        }} />
                    <TextField id="aluno" label="Aluno" variant="outlined" fullWidth value={autor}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setAutor(event.target.value);
                        }} />
                    <TextField id="orientador" label="Professor Orientador" variant="outlined" fullWidth value={orientador}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setOrientador(event.target.value);
                        }} />
                    <FormControl>
                        <FormLabel id="selecionar-trilha">Trilha</FormLabel>
                        <RadioGroup
                            aria-labelledby="selecionar-trilha-grupo"
                            value={trilha}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setTrilha(event.target.value);
                            }}
                            name="radio-buttons-group"
                            row
                        >
                            <FormControlLabel value="Sistemas" control={<Radio />} label="Sistemas" sx={{ color: 'text.primary' }} />
                            <FormControlLabel value="Design" control={<Radio />} label="Design" sx={{ color: 'text.primary' }} />
                            <FormControlLabel value="Audiovisual" control={<Radio />} label="Audiovisual" sx={{ color: 'text.primary' }} />
                            <FormControlLabel value="Jogos Digitais" control={<Radio />} label="Jogos Digitais" sx={{ color: 'text.primary' }} />
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel id="selecionar_tipo">Tipo de Trabalho</FormLabel>
                        <RadioGroup
                            aria-labelledby="selecionar-tipo-group"
                            value={tipo}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setTipo(event.target.value);
                            }}
                            name="radio-buttons-group"
                            row
                        >
                            <FormControlLabel value="Artigo" control={<Radio />} label="Artigo" sx={{ color: 'text.primary' }} />
                            <FormControlLabel value="Monografia" control={<Radio />} label="Monografia" sx={{ color: 'text.primary' }} />
                            <FormControlLabel value="Relatório Técnico" control={<Radio />} label="Relatório Técnico" sx={{ color: 'text.primary' }} />
                        </RadioGroup>
                    </FormControl>
                    <Button variant="contained" onClick={handleNavigateToResultadosPesquisa}>Buscar Trabalho</Button>
                </Box>
            </Box>
        </Box>
    );
}