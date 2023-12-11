
import {Routes, Route, Navigate} from 'react-router-dom'
import { PaginaInicial } from '../pages/PaginaInicial';
import { ResultadosPesquisa } from '../pages/ResultadosPesquisa';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/pagina-inicial" element={<PaginaInicial/>}/>
            <Route path="/resultados-pesquisa" element={<ResultadosPesquisa/>}/>
            <Route path="*" element={<Navigate to="/pagina-inicial" />}/>
        </Routes>
    );
}