<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BIZÚ MILITAR FÊNIX - PLATAFORMA DE ELITE</title>
    
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    
    <style>
        :root { --azul-marinho: #001233; --dourado-ouro: #D4AF37; --vermelho-tatico: #bc0000; }
        body { background-color: var(--azul-marinho); color: white; margin: 0; font-family: 'Segoe UI', sans-serif; overflow-x: hidden; }
        .militar-gradient { background: linear-gradient(135deg, #001233 0%, #000814 100%); min-height: 100vh; }
        .linha-vermelha { height: 4px; background: repeating-linear-gradient(45deg, var(--vermelho-tatico), var(--vermelho-tatico) 10px, #7b0000 10px, #7b0000 20px); width: 100%; }
        
        .btn-material { background-color: #D4AF37 !important; color: #000 !important; font-weight: 900 !important; text-transform: uppercase; padding: 12px; border-radius: 6px; transition: 0.3s; width: 100%; cursor: pointer; border: none; }
        .btn-material:hover { transform: scale(1.02); box-shadow: 0 0 15px rgba(212, 175, 55, 0.4); background-color: #fff !important; }
        .btn-voltar-fixo { background-color: #fff !important; color: #000 !important; font-weight: 900 !important; padding: 8px 16px !important; border: 3px solid #D4AF37 !important; text-transform: uppercase; cursor: pointer; }
        
        .card-escola { position: relative; height: 180px; border-radius: 12px; border-bottom: 4px solid #D4AF37; overflow: hidden; display: flex; align-items: center; justify-content: center; background-size: cover; background-position: center; cursor: pointer; transition: 0.4s; background-color: #000; }
        .card-escola:hover { transform: translateY(-5px); border-bottom-color: #fff; }
        .card-escola::before { content: ""; position: absolute; inset: 0; background: rgba(0, 18, 51, 0.7); transition: 0.3s; }
        .card-escola:hover::before { background: rgba(0, 18, 51, 0.4); }
        
        .sigla-txt { position: relative; z-index: 10; font-size: 2.2rem; font-weight: 900; color: #D4AF37; font-style: italic; text-shadow: 2px 2px 10px black; }
        .frase-box { background: rgba(0,0,0,0.5); border-left: 4px solid var(--vermelho-tatico); padding: 20px; border-radius: 0 8px 8px 0; }
        
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 10px; }
        .motion-header { height: 60px; filter: drop-shadow(0 0 5px #D4AF37); }
        .video-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.3); }
        .video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect } = React;
        const BASE_URL = "https://raw.githubusercontent.com/ivespe-cpu/bizufenix/main/";

        const CONFIG_ESCOLAS = {
            "COLÉGIO NAVAL": { materias: ["MATEMÁTICA", "PORTUGUÊS", "INGLÊS", "HISTÓRIA", "GEOGRAFIA", "FÍSICA", "QUÍMICA", "BIOLOGIA"], slug: "cn" },
            "EPCAR": { materias: ["MATEMÁTICA", "PORTUGUÊS", "INGLÊS", "REDAÇÃO"], slug: "epcar" },
            "CMRJ": { materias: ["MATEMÁTICA", "PORTUGUÊS", "REDAÇÃO"], slug: "cmrj" },
            "EsPCEX": { materias: ["MATEMÁTICA", "PORTUGUÊS", "INGLÊS", "HISTÓRIA", "GEOGRAFIA", "FÍSICA", "QUÍMICA"], slug: "espcex" },
            "EEAR": { materias: ["MATEMÁTICA", "PORTUGUÊS", "INGLÊS", "FÍSICA"], slug: "eear" },
            "ESA": { materias: ["MATEMÁTICA", "PORTUGUÊS", "HISTÓRIA", "GEOGRAFIA", "INGLÊS"], slug: "esa" }
        };

        const ALUNOS_DB = [
            { m: "ags186", p: "SG.GASPARELLO", pts: 1500 }, { m: "alm170", p: "SG. MOURA", pts: 1450 },
            { m: "bsp223", p: "SD. PINHEIRO", pts: 1200 }, { m: "bab196", p: "CB. BRAYAN", pts: 1100 },
            { m: "bbs203", p: "SD. BERNARDO", pts: 900 }, { m: "cvs208", p: "CB. CAMILA", pts: 1050 },
            { m: "dva194", p: "CB. ALBUQUERQUE", pts: 1300 }, { m: "esp192", p: "SG. PEIXOTO", pts: 1250 },
            { m: "egc228", p: "CB. ENZO", pts: 850 }, { m: "gsp187", p: "SG. GABRIELLE PEREIRA", pts: 1400 },
            { m: "gac174", p: "SG. GABRIELLY COUTINHO", pts: 1350 }, { m: "gem240", p: "SD.MICAELA", pts: 950 },
            { m: "gfa109", p: "SUB.TEN. ARAUJO", pts: 1900 }, { m: "hls197", p: "CB. SALES", pts: 1150 },
            { m: "icg127", p: "SG. GRANADO", pts: 1600 }, { m: "iws159", p: "SG. LIMA", pts: 1550 },
            { m: "jgm108", p: "SUB.TEN. MORAES", pts: 1950 }, { m: "jpj110", p: "ASP. JOÃO SAMUEL", pts: 2000 },
            { m: "jva190", p: "SG. ANDRADE", pts: 1480 }, { m: "jhs198", p: "CB. JOSUÉ", pts: 1120 },
            { m: "jcm166", p: "SG. JUNIO", pts: 1420 }, { m: "kfs245", p: "CB. FONTES", pts: 1080 },
            { m: "lgb226", p: "CB. BELTRON", pts: 1190 }, { m: "lod225", p: "CB. FADINI", pts: 1170 },
            { m: "lse165", p: "SG. ELEUTHÉRIO", pts: 1510 }, { m: "lfs220", p: "CB. LUIZ FERNANDO", pts: 1030 },
            { m: "lmc184", p: "SG. COSTA", pts: 1800 }, { m: "mps144", p: "SG. PEÇANHA", pts: 1750 },
            { m: "mis133", p: "SG. IRENO", pts: 1320 }, { m: "nmp214", p: "CB. NATHAN", pts: 800 },
            { m: "nab161", p: "SG. NICOLLAS ARTHUR", pts: 1580 }, { m: "nvo148", p: "SG. NICOLY VICTORIA", pts: 1570 },
            { m: "php105", p: "SUB.TEN. PAULO", pts: 1910 }, { m: "pha219", p: "CB. PEDRO HENRIQUE", pts: 1180 },
            { m: "pho188", p: "SG. DE PAULA", pts: 1410 }, { m: "phm185", p: "SG. PEDRO RIBEIRO", pts: 1430 },
            { m: "phc232", p: "SD. PIETRO", pts: 920 }, { m: "rsb130", p: "SG. BARBOSA", pts: 1620 },
            { m: "scg216", p: "SD. SAMANTHA", pts: 940 }, { m: "tvo212", p: "SG. THAYANE", pts: 1390 },
            { m: "tgs164", p: "SG. GARCIA", pts: 1470 }, { m: "vho129", p: "SG. VICTOR HUGO", pts: 1650 }
        ];

// --- BANCO DE DADOS: QUESTÕES ---
        const QUESTOES_DB = {
            "COLÉGIO NAVAL": [
                { q: "Se x + 1/x = 5, determine o valor de x² + 1/x².", opts: ["23", "25", "27", "30"], correta: 0, bizu: "Eleve (x + 1/x)² = 25. O termo central é 2. Logo, 25 - 2 = 23." },
                { q: "Qual o resto da divisão de 38 por 7?", opts: ["1", "2", "3", "5"], correta: 2, bizu: "38 = 7*5 + 3. Resto é 3." },
                { q: "Qual o valor da expressão (1/2)^-2 + (1/3)^-1?", opts: ["5", "7", "4", "1"], correta: 1, bizu: "(1/2)^-2 = 4 e (1/3)^-1 = 3. Soma = 7." },
                { q: "Simplificando √(7 + √48), obtemos:", opts: ["2 + √3", "3 + √2", "√5 + √2", "1 + √6"], correta: 0, bizu: "Radical Duplo. A=7, B=48. C=1." },
                { q: "Se a² + b² = 50 e ab = 7, qual o valor de (a-b)²?", opts: ["36", "43", "57", "64"], correta: 0, bizu: "(a-b)² = a² - 2ab + b² -> 50 - 14 = 36." }
            ],
            "EPCAR": [
                { q: "A média aritmética de n números é 20. Se retirarmos o número 40, a nova média passa a ser 18. Qual o valor de n?", opts: ["10", "11", "12", "15"], correta: 1, bizu: "Soma original: 20n. (20n - 40)/(n-1) = 18. Resolvendo: 20n-40=18n-18 -> 2n=22 -> n=11." },
                { q: "No sistema decimal, quantos algarismos são usados para escrever de 1 a 100?", opts: ["189", "190", "192", "200"], correta: 2, bizu: "1-9 (9), 10-99 (180), 100 (3). Total: 192." },
                { q: "O valor de (0,25)^-1/2 é:", opts: ["0,5", "2", "4", "8"], correta: 1, bizu: "0,25 = 1/4. Invertendo pelo expoente negativo temos 4^1/2, que é √4 = 2." }
            ],
            "EsPCEX": [
                { q: "Determine o domínio da função f(x) = log(x - 3).", opts: ["x < 3", "x > 0", "x > 3", "x ≠ 3"], correta: 2, bizu: "Condição de existência do logaritmo: x - 3 > 0, logo x > 3." },
                { q: "A distância entre A(1, 2) e B(4, 6) é:", opts: ["3", "4", "5", "7"], correta: 2, bizu: "Pitágoras: d² = 3² + 4² = 25. d = 5." },
                { q: "Qual o valor de cos(180°)?", opts: ["0", "1", "-1", "1/2"], correta: 2, bizu: "No círculo trigonométrico, 180° está no extremo esquerdo do eixo horizontal (x)." }
            ],
            "CMRJ": [
                { q: "Em uma turma de 30 alunos, 18 gostam de Matemática. Qual a porcentagem?", opts: ["50%", "55%", "60%", "65%"], correta: 2, bizu: "(18/30) * 100 = 0,6 * 100 = 60%." },
                { q: "Qual o MMC de 12 e 15?", opts: ["30", "45", "60", "90"], correta: 2, bizu: "Múltiplos de 15: 15, 30, 45, 60... 60 é divisível por 12." }
            ],
            "EEAR": [
                { q: "Uma aeronave voa a 720 km/h. Qual sua velocidade em m/s?", opts: ["150", "200", "250", "300"], correta: 1, bizu: "Divida por 3,6. 720 / 3,6 = 200 m/s." },
                { q: "A pressão atmosférica ao nível do mar vale aproximadamente:", opts: ["1 atm", "2 atm", "5 atm", "10 atm"], correta: 0, bizu: "Conceito básico de física: 1 atm = 760 mmHg." }
            ],
            "ESA": [
                { q: "Qual o valor de x na equação 2^x = 128?", opts: ["5", "6", "7", "8"], correta: 2, bizu: "Fatorando 128: 2^1=2, 2^2=4, 2^3=8, 2^4=16, 2^5=32, 2^6=64, 2^7=128." },
                { q: "Quem proclamou a República no Brasil em 1889?", opts: ["D. Pedro II", "Deodoro da Fonseca", "Floriano Peixoto", "Princesa Isabel"], correta: 1, bizu: "O Marechal Deodoro da Fonseca liderou o movimento em 15 de novembro." }
            ]
        };
        const FRASES_COMANDO = [
            "A limitação está apenas na sua mente.",
            "Coragem não é não ter medo, e sim, seguir em frente.",
            "Grandes batalhas só são dadas a grandes guerreiros.",
            "Vencer na vida não é um destino, é a sua escolha.",
            "Os fortes agem, avançam e deixam um legado."
        ];
        const VIDEOS_DB = [
            { t: "FAB - EPCAR", id: "Vq_Z5KNmuks" }, { t: "MARINHA DO BRASIL", id: "zSSp5CQpg10" },
            { t: "INSTITUCIONAL", id: "H0Gssr6mZbw" }, { t: "MOTIVACIONAL", id: "Nc3WusSAIQI" },
            { t: "QUEM DISSE QUE SERIA FÁCIL", id: "dOV_Dum7t58" }, { t: "ESPCEX AMAN", id: "WKMS3LfGERo" }
        ];
        function App() {
            const [status, setStatus] = useState('login'); 
            const [user, setUser] = useState(null);
            const [senhaIn, setSenhaIn] = useState('');
            const [escolaSel, setEscolaSel] = useState('COLÉGIO NAVAL');
            const [fraseDia, setFraseDia] = useState('');
            const [tipoDoc, setTipoDoc] = useState(''); 
            const [pdfAtivo, setPdfAtivo] = useState(null);

useEffect(() => {
                setFraseDia(FRASES_COMANDO[Math.floor(Math.random() * FRASES_COMANDO.length)]);
            }, [status]);

            const handleLogin = (e) => {
                if(e) e.preventDefault();
                const s = senhaIn.toLowerCase().trim();
                const aluno = ALUNOS_DB.find(a => a.m === s);
                if (s === "esp0815") { setUser({ p: "COMANDANTE", pts: "∞" }); setStatus('qg'); } 
                else if (s === "instrutor77") { setUser({ p: "INSTRUTOR TÁTICO", pts: "9999" }); setStatus('qg'); }
                else if (aluno) { setUser(aluno); setStatus('qg'); } 
                else { 
                    alert("ACESSO NEGADO! Verifique sua matrícula."); 
                }
            };

            const formatName = (name) => name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_');

            const handleAbrirApostila = (materia) => {
                const matClean = formatName(materia);
                const escolaClean = CONFIG_ESCOLAS[escolaSel].slug;
                setPdfAtivo({ url: `pdf/${matClean}_${escolaClean}.pdf`, nome: `${materia} - ${escolaSel}` });
            };

            const renderContent = () => {
                if (status === 'login') return (
                    <div className="min-h-screen flex items-center justify-center p-6">
                        <div className="max-w-md w-full bg-black/80 p-8 rounded-2xl border-2 border-[#D4AF37]/30 text-center">
                            <video className="w-full rounded mb-6 border border-[#D4AF37]/20" autoPlay loop muted playsInline>
                                <source src={BASE_URL + "video/bizu8.mp4"} type="video/mp4" />
                            </video>
                            <div className="linha-vermelha mb-8"></div>
                            <input type="password" value={senhaIn} onChange={(e) => setSenhaIn(e.target.value)}
                                   className="w-full p-4 mb-4 bg-white/5 border border-[#D4AF37]/20 rounded text-white text-center text-xl font-mono" placeholder="MATRÍCULA" />
                            <button onClick={handleLogin} className="w-full btn-material">AUTENTICAR</button>
                        </div>
                    </div>
                );

                if (status === 'qg') return (
                    <div className="min-h-screen">
                        <header className="bg-[#000814] border-b-2 border-[#D4AF37] p-4 flex items-center justify-between px-6 sticky top-0 z-50">
                            <video className="motion-header" autoPlay loop muted playsInline>
                                <source src={BASE_URL + "video/esquadrao2.mp4"} type="video/mp4" />
                            </video>
                            <div className="text-center hidden md:block">
                                <h2 className="text-xl font-black text-[#D4AF37] italic uppercase">BEM-VINDO, {user?.p}</h2>
                            </div>
                            <button onClick={() => setStatus('login')} className="text-red-500 font-bold border border-red-500/20 px-3 py-1 rounded text-xs">SAIR</button>
                        </header>
                        <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="frase-box mb-8"><p className="text-xl font-medium italic">"{fraseDia}"</p></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.keys(CONFIG_ESCOLAS).map(escolaNome => (
                                        <div key={escolaNome} onClick={() => {setEscolaSel(escolaNome); setStatus('escola');}} 
                                             className="card-escola hover:scale-[1.02] transition-all" 
                                             style={{backgroundImage: `url(${BASE_URL}jpg/${CONFIG_ESCOLAS[escolaNome].slug}.jpg)`}}>
                                            <span className="sigla-txt">{escolaNome}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-black/40 p-5 rounded-xl border border-[#D4AF37]/20 h-[550px] flex flex-col shadow-2xl">
                                <h3 className="text-[#D4AF37] font-black text-center mb-4 uppercase">Ranking Pelotão</h3>
                                <div className="space-y-2 overflow-y-auto custom-scroll pr-2">
                                    {ALUNOS_DB.sort((a,b) => b.pts - a.pts).map((a, i) => (
                                        <div key={i} className="flex justify-between p-3 bg-white/5 rounded text-[11px] border-l-4 border-[#D4AF37]">
                                            <span>{i+1}º {a.p}</span><span className="text-[#D4AF37] font-black">{a.pts} PTS</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </main>
                    </div>
                );

                if (status === 'escola') return (
                    <div className="min-h-screen">
                        <header className="bg-[#000814] border-b-2 border-[#D4AF37] p-4 flex justify-between items-center px-6">
                            <h1 className="text-lg font-black text-[#D4AF37] uppercase">{escolaSel}</h1>
                            <button onClick={() => setStatus('qg')} className="btn-voltar-fixo">VOLTAR AO QG</button>
                        </header>
                        <main className="max-w-5xl mx-auto p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <button onClick={() => setStatus('simulado_interno')} className="bg-gradient-to-br from-red-700 to-red-900 p-8 rounded-xl font-black shadow-lg">📝 SIMULADO</button>
                            <button onClick={() => setStatus('materiais_menu')} className="bg-gradient-to-br from-blue-800 to-blue-900 p-8 rounded-xl font-black shadow-lg">📚 MATERIAIS</button>
                            <button onClick={() => setStatus('videos')} className="bg-gradient-to-br from-[#D4AF37] to-yellow-700 text-black p-8 rounded-xl font-black shadow-lg">🎬 VÍDEOS</button>
                        </main>
                    </div>
                );

                if (status === 'materiais_menu') return (
                     <div className="min-h-screen">
                        <header className="bg-[#000814] border-b-2 border-[#D4AF37] p-4 flex justify-between items-center px-6">
                            <h1 className="text-lg font-black text-[#D4AF37] uppercase">BIBLIOTECA: {escolaSel}</h1>
                            <button onClick={() => setStatus('escola')} className="btn-voltar-fixo">VOLTAR</button>
                        </header>
                        <main className="max-w-6xl mx-auto p-8">
                            <div className="flex flex-wrap gap-4 justify-center mb-10">
                                <button onClick={() => { setTipoDoc('PROVAS ANTERIORES'); setStatus('documentos'); }} className="bg-white/10 border border-[#D4AF37]/40 px-6 py-3 rounded hover:bg-[#D4AF37] hover:text-black transition font-black text-[#D4AF37]">📜 Provas</button>
                                <button onClick={() => { setTipoDoc('EDITAIS'); setStatus('documentos'); }} className="bg-white/10 border border-[#D4AF37]/40 px-6 py-3 rounded hover:bg-[#D4AF37] hover:text-black transition font-black text-[#D4AF37]">📢 Editais</button>
<button onClick={() => { setTipoDoc('GABARITOS'); setStatus('documentos'); }} className="bg-white/10 border border-[#D4AF37]/40 px-6 py-3 rounded hover:bg-[#D4AF37] hover:text-black transition font-black text-[#D4AF37] uppercase">✅ Gabaritos</button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {CONFIG_ESCOLAS[escolaSel].materias.map((mat, i) => (
                                    <div key={i} className="bg-black/60 border border-[#D4AF37]/20 rounded-2xl overflow-hidden flex flex-col shadow-lg">
                                        <div className="h-[150px] bg-slate-900 flex items-center justify-center p-2">
                                            {/* BUSCA A CAPA NA PASTA /png/ */}
                                            <img src={`${BASE_URL}png/${formatName(mat)}.png`} 
                                                 className="h-full object-contain" 
                                                 onError={(e) => {e.target.src="https://via.placeholder.com/150?text=BIZU";}} />
                                        </div>
                                        <div className="p-4 text-center">
                                            <div className="text-[#D4AF37] font-black text-[10px] mb-3 uppercase">{mat}</div>
                                            <button onClick={() => handleAbrirApostila(mat)} className="w-full btn-material text-[10px]">ABRIR PDF</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </main>
                    </div>
                );

                if (status === 'simulado_interno') {
                    const questoes = QUESTOES_DB[escolaSel] || [];
                    return (
                        <div className="min-h-screen p-6">
                            <header className="flex justify-between items-center max-w-4xl mx-auto mb-10 border-b border-[#D4AF37] pb-4">
                                <h1 className="text-[#D4AF37] font-black text-xl italic uppercase">COMBATE: {escolaSel}</h1>
                                <button onClick={() => setStatus('escola')} className="btn-voltar-fixo text-xs">RECUAR</button>
                            </header>
                            <div className="max-w-4xl mx-auto space-y-8">
                                {questoes.map((item, index) => (
                                    <div key={index} className="bg-black/60 p-6 rounded-2xl border border-[#D4AF37]/20 shadow-xl">
                                        <p className="text-lg font-bold mb-6"> {index + 1}: {item.q}</p>
                                        <div className="grid gap-3">
                                            {item.opts.map((opt, i) => (
                                                <button key={i} onClick={() => {
                                                    if(i === item.correta) alert("✅ NA MOSCA, GUERREIRO!");
                                                    else alert(`❌ ERRADO! \n\n💡 BIZU: ${item.bizu}`);
                                                }} className="text-left p-4 bg-white/5 border border-white/10 hover:border-[#D4AF37] rounded-lg transition-all">
                                                    <span className="text-[#D4AF37] font-bold mr-2">{String.fromCharCode(65 + i)})</span> {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                }

                if (status === 'documentos') {
                    const arquivos = [`edital_${CONFIG_ESCOLAS[escolaSel].slug}.pdf`, `prova2025_${CONFIG_ESCOLAS[escolaSel].slug}.pdf` ];
                    return (
                        <div className="min-h-screen">
                            <header className="bg-[#000814] border-b-2 border-[#D4AF37] p-4 flex justify-between items-center px-10">
                                <h1 className="text-xl font-black text-[#D4AF37] uppercase">{tipoDoc}</h1>
                                <button onClick={() => setStatus('materiais_menu')} className="btn-voltar-fixo">VOLTAR</button>
                            </header>
                            <main className="max-w-4xl mx-auto p-6 space-y-3">
                                {arquivos.map((arq, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-4 bg-black/40 border-l-4 border-[#D4AF37] rounded">
                                        <span className="text-xs font-bold uppercase">{arq.replace(/_/g, ' ')}</span>
                                        <button onClick={() => setPdfAtivo({ url: `pdf/${arq}`, nome: arq.toUpperCase() })}
                                                className="bg-[#D4AF37] text-black text-[10px] font-black px-6 py-2 rounded">ABRIR</button>
                                    </div>
                                ))}
                            </main>
                        </div>
                    );
                }

                if (status === 'videos') return (
                    <div className="min-h-screen">
                        <header className="bg-[#000814] border-b-2 border-[#D4AF37] p-4 flex justify-between items-center px-6">
                            <h1 className="text-xl font-black text-[#D4AF37] italic uppercase">🎬 CINE FÊNIX</h1>
                            <button onClick={() => setStatus('escola')} className="btn-voltar-fixo">VOLTAR</button>
                        </header>
                        <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {VIDEOS_DB.map((v, i) => (
                                <div key={i} className="bg-black/60 p-4 rounded-xl border border-[#D4AF37]/20">
                                    <h3 className="text-[#D4AF37] font-bold mb-3 uppercase text-xs">{v.t}</h3>
                                    <div className="video-container"><iframe src={`https://www.youtube.com/embed/${v.id}`} allowFullScreen></iframe></div>
                                </div>
                            ))}
                        </main>
                    </div>
                );
            };

            return (
                <div className="militar-gradient relative min-h-screen">
                    {renderContent()}
                    {pdfAtivo && (
                        <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col p-2">
                            <div className="flex justify-between items-center mb-4 bg-[#000814] p-4 border border-[#D4AF37]/30">
                                <h2 className="text-[#D4AF37] font-black uppercase text-xs">LEITURA: {pdfAtivo.nome}</h2>
                                <button onClick={() => setPdfAtivo(null)} className="bg-red-600 px-6 py-2 rounded font-black">FECHAR</button>
                            </div>
                            <div className="flex-1 bg-white rounded overflow-hidden">
                                <iframe src={`https://docs.google.com/viewer?url=${encodeURIComponent(BASE_URL + pdfAtivo.url)}&embedded=true`} className="w-full h-full border-0" />
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>


