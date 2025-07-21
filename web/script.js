const data = {
    domains: [
        {
            name: "Ventas",
            subdomains: [
                {
                    name: "POS",
                    tables: [
                        { name: "ventas_diarias", description: "Detalle de ventas diarias." },
                        { name: "detalles_transacciones", description: "Detalle de cada transacción." }
                    ]
                },
                {
                    name: "Promociones",
                    tables: [
                        { name: "descuentos", description: "Listado de descuentos vigentes." },
                        { name: "campanas", description: "Campañas de marketing." }
                    ]
                }
            ]
        },
        {
            name: "Inventario",
            subdomains: [
                {
                    name: "Bodegas",
                    tables: [
                        { name: "stock_actual", description: "Stock en bodegas." },
                        { name: "movimientos", description: "Movimientos de inventario." }
                    ]
                },
                {
                    name: "Pedidos",
                    tables: [
                        { name: "ordenes_compra", description: "Registro de órdenes de compra." },
                        { name: "recepciones", description: "Recepciones de mercadería." }
                    ]
                }
            ]
        },
        {
            name: "Clientes",
            subdomains: [
                {
                    name: "Segmentos",
                    tables: [
                        { name: "segmentos_clientes", description: "Clasificación de clientes." },
                        { name: "fidelizacion", description: "Programas de fidelización." }
                    ]
                },
                {
                    name: "Satisfaccion",
                    tables: [
                        { name: "encuestas", description: "Resultados de encuestas." },
                        { name: "comentarios", description: "Comentarios de clientes." }
                    ]
                }
            ]
        }
    ],
    topics: ["ventas", "promociones", "inventario", "clientes"],
    mainTables: ["ventas_diarias", "stock_actual", "segmentos_clientes"]
};

function renderStats() {
    const totalDomains = data.domains.length;
    const totalTables = data.domains.reduce((acc, domain) => {
        return acc + domain.subdomains.reduce((sAcc, sub) => sAcc + sub.tables.length, 0);
    }, 0);
    const statsDiv = document.getElementById("stats");
    statsDiv.innerHTML = `<p><strong>Dominios:</strong> ${totalDomains}</p>` +
                         `<p><strong>Total de tablas:</strong> ${totalTables}</p>`;
}

function renderDomains() {
    const domainList = document.getElementById("domain-list");
    data.domains.forEach(domain => {
        const domainDiv = document.createElement("div");
        domainDiv.classList.add("domain");
        const subdomainCount = domain.subdomains.length;
        const tableCount = domain.subdomains.reduce((acc, sub) => acc + sub.tables.length, 0);
        const title = document.createElement("h4");
        title.textContent = `${domain.name} (Subdominios: ${subdomainCount}, Tablas: ${tableCount})`;
        domainDiv.appendChild(title);
        domain.subdomains.forEach(sub => {
            const subDiv = document.createElement("div");
            subDiv.classList.add("subdomain");
            const subTitle = document.createElement("h5");
            subTitle.textContent = `${sub.name} (${sub.tables.length} tablas)`;
            subDiv.appendChild(subTitle);
            const tableUl = document.createElement("ul");
            sub.tables.forEach(table => {
                const li = document.createElement("li");
                li.textContent = table.name;
                tableUl.appendChild(li);
            });
            subDiv.appendChild(tableUl);
            domainDiv.appendChild(subDiv);
        });
        domainList.appendChild(domainDiv);
    });
}

function renderTopics() {
    const topicList = document.getElementById("topic-list");
    data.topics.forEach(topic => {
        const li = document.createElement("li");
        li.textContent = topic;
        topicList.appendChild(li);
    });
}

function renderMainTables() {
    const tableList = document.getElementById("table-list");
    data.mainTables.forEach(table => {
        const li = document.createElement("li");
        li.textContent = table;
        tableList.appendChild(li);
    });
}

function init() {
    renderStats();
    renderDomains();
    renderTopics();
    renderMainTables();
}

window.addEventListener("DOMContentLoaded", init);
