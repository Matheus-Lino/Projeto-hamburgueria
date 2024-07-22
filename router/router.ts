interface Rotas {
    nome: string;
    path: string;
}

export default (dashboardCode: string) => {
    const rotas: Rotas[] = [
        { nome: "HOME", path: "Home"},
        { nome: "PEDIDOS", path: "Pedidos"}
    ]
    return rotas;
}