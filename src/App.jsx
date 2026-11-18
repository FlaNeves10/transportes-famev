import { useState, useEffect } from 'react';
import './App.css';

const estados = [
  { nome: 'Acre', sigla: 'AC' }, { nome: 'Alagoas', sigla: 'AL' },
  { nome: 'Amapá', sigla: 'AP' }, { nome: 'Amazonas', sigla: 'AM' },
  { nome: 'Bahia', sigla: 'BA' }, { nome: 'Ceará', sigla: 'CE' },
  { nome: 'Distrito Federal', sigla: 'DF' }, { nome: 'Espírito Santo', sigla: 'ES' },
  { nome: 'Goiás', sigla: 'GO' }, { nome: 'Maranhão', sigla: 'MA' },
  { nome: 'Mato Grosso', sigla: 'MT' }, { nome: 'Mato Grosso do Sul', sigla: 'MS' },
  { nome: 'Minas Gerais', sigla: 'MG' }, { nome: 'Pará', sigla: 'PA' },
  { nome: 'Paraíba', sigla: 'PB' }, { nome: 'Paraná', sigla: 'PR' },
  { nome: 'Pernambuco', sigla: 'PE' }, { nome: 'Piauí', sigla: 'PI' },
  { nome: 'Rio de Janeiro', sigla: 'RJ' }, { nome: 'Rio Grande do Norte', sigla: 'RN' },
  { nome: 'Rio Grande do Sul', sigla: 'RS' }, { nome: 'Rondônia', sigla: 'RO' },
  { nome: 'Roraima', sigla: 'RR' }, { nome: 'Santa Catarina', sigla: 'SC' },
  { nome: 'São Paulo', sigla: 'SP' }, { nome: 'Sergipe', sigla: 'SE' },
  { nome: 'Tocantins', sigla: 'TO' }
];

function App() {
  const [origemUF, setOrigemUF] = useState('');
  const [destinoUF, setDestinoUF] = useState('');
  const [cidadeOrigem, setCidadeOrigem] = useState('');
  const [cidadeDestino, setCidadeDestino] = useState('');
  const [cidadesOrigem, setCidadesOrigem] = useState([]);
  const [cidadesDestino, setCidadesDestino] = useState([]);

  useEffect(() => {
    if (!origemUF) {
      setCidadesOrigem([]);
      return;
    }

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${origemUF}/municipios`)
      .then((resposta) => {
        if (!resposta.ok) throw new Error('Não foi possível carregar as cidades de origem.');
        return resposta.json();
      })
      .then((dados) => setCidadesOrigem(dados.map((cidade) => cidade.nome)))
      .catch((erro) => {
        console.error('Erro ao carregar cidades de origem:', erro);
        setCidadesOrigem([]);
      });
  }, [origemUF]);

  useEffect(() => {
    if (!destinoUF) {
      setCidadesDestino([]);
      return;
    }

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${destinoUF}/municipios`)
      .then((resposta) => {
        if (!resposta.ok) throw new Error('Não foi possível carregar as cidades de destino.');
        return resposta.json();
      })
      .then((dados) => setCidadesDestino(dados.map((cidade) => cidade.nome)))
      .catch((erro) => {
        console.error('Erro ao carregar cidades de destino:', erro);
        setCidadesDestino([]);
      });
  }, [destinoUF]);

  function enviarFormulario(event) {
    event.preventDefault();

    const formulario = event.currentTarget;
    const campos = Array.from(formulario.querySelectorAll('input, select, textarea'));

    const informacoes = campos.map((campo) => {
      const rotulo = campo.parentElement.querySelector('label');
      if (!rotulo) return null;

      const valor = campo.value.trim();
      if (!valor) return null;

      const nome = rotulo.innerText.replace(/\*/g, '').trim();
      return `*${nome}:* ${valor}`;
    }).filter(Boolean);

    const mensagem = [
      'Olá! Gostaria de solicitar um orçamento de transporte.',
      '',
      'Seguem as informações da minha solicitação:',
      '',
      ...informacoes,
      '',
      'Aguardo o retorno. Obrigado!'
    ].join('\n');

    const telefone = '5548998177107';
    const linkWhatsApp = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

    window.open(linkWhatsApp, '_blank');
  }

  return (
    <div className="site">
      <header className="cabecalho">
        <a href="#inicio" className="logo">TRANSPORTES <span>FAMEV</span></a>

        <nav>
          <a href="#inicio">Início</a>
          <a href="#empresa">A empresa</a>
          <a href="#servicos">Serviços</a>
          <a href="#contato">Contato</a>
        </nav>

        <a href="#orcamento" className="botao-topo">Solicitar orçamento</a>
      </header>

      <main>
        <section className="inicio" id="inicio">
          <div className="imagem-master">
            <img src="/master-2017.png" alt="Renault Master Furgão 2017" />
          </div>

          <div className="conteudo">
            <span className="subtitulo">TRANSPORTES FAMEV</span>

            <h1>
              Sua carga em boas mãos.
              <span>Seu destino, nossa responsabilidade.</span>
            </h1>

            <p>
              Somos uma empresa familiar que trabalha para oferecer soluções
              em transporte com segurança, pontualidade e compromisso,
              atendendo empresas e pessoas.
            </p>

            <a href="#orcamento" className="botao-principal">
              <span className="icone-caminhao">▣</span>
              Solicitar um orçamento
              <span className="seta">→</span>
            </a>

            <div className="diferenciais">
              <div className="diferencial">
                <span className="icone">♢</span>
                <div><strong>Segurança</strong><small>em cada entrega</small></div>
              </div>

              <div className="diferencial">
                <span className="icone">◷</span>
                <div><strong>Pontualidade</strong><small>nos prazos</small></div>
              </div>

              <div className="diferencial">
                <span className="icone">♧</span>
                <div><strong>Compromisso</strong><small>com o cliente</small></div>
              </div>
            </div>
          </div>
        </section>

        <section className="empresa" id="empresa">
          <span className="etiqueta">QUEM SOMOS</span>
          <h2>Uma família, movendo o seu mundo.</h2>
          <p>
            A Transportes FAMEV é uma empresa familiar que acredita que cada
            transporte exige cuidado, responsabilidade e atenção. Nosso
            compromisso é conectar pessoas e empresas por meio de um serviço
            dedicado, com foco na segurança, na pontualidade e na confiança.
          </p>
        </section>

        <section className="servicos" id="servicos">
          <span className="etiqueta">O QUE FAZEMOS</span>
          <h2>Nossos serviços</h2>

          <div className="servicos-container">
            <div className="servico-card">
              <h3>Transporte de cargas</h3>
              <p>Transporte de mercadorias com segurança e cuidado em cada etapa.</p>
            </div>

            <div className="servico-card">
              <h3>Coletas e entregas</h3>
              <p>Atendimento personalizado para empresas e pessoas físicas.</p>
            </div>

            <div className="servico-card">
              <h3>Transporte dedicado</h3>
              <p>Soluções planejadas de acordo com a necessidade de cada cliente.</p>
            </div>
          </div>
        </section>

        <section className="orcamento" id="orcamento">
          <div className="orcamento-cabecalho">
            <h2>Solicite seu orçamento</h2>
            <p>
              Preencha os dados abaixo para que possamos entender sua
              necessidade e preparar uma proposta de transporte.
            </p>
          </div>

          <p className="legenda-obrigatorio">
            <span className="campo-obrigatorio">*</span> Campos de preenchimento obrigatório.
          </p>

          <form className="formulario" onSubmit={enviarFormulario}>
            <div className="grupo-formulario">
              <h3>1. Origem do transporte</h3>

              <div className="campos-grid">
                <div>
                  <label>Estado <span className="campo-obrigatorio">*</span></label>
                  <select
                    value={origemUF}
                    onChange={(e) => {
                      setOrigemUF(e.target.value);
                      setCidadeOrigem('');
                    }}
                    required
                  >
                    <option value="">Selecione o estado</option>
                    {estados.map((estado) => (
                      <option key={estado.sigla} value={estado.sigla}>{estado.nome}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Cidade <span className="campo-obrigatorio">*</span></label>
                  <select
                    value={cidadeOrigem}
                    onChange={(e) => setCidadeOrigem(e.target.value)}
                    disabled={!origemUF || cidadesOrigem.length === 0}
                    required
                  >
                    <option value="">Selecione a cidade</option>
                    {cidadesOrigem.map((cidade) => (
                      <option key={cidade} value={cidade}>{cidade}</option>
                    ))}
                  </select>
                </div>

                <div className="campo-completo">
                  <label>Endereço completo</label>
                  <input type="text" placeholder="Rua, número e bairro" />
                </div>
              </div>
            </div>

            <div className="grupo-formulario">
              <h3>2. Destino do transporte</h3>

              <div className="campos-grid">
                <div>
                  <label>Estado <span className="campo-obrigatorio">*</span></label>
                  <select
                    value={destinoUF}
                    onChange={(e) => {
                      setDestinoUF(e.target.value);
                      setCidadeDestino('');
                    }}
                    required
                  >
                    <option value="">Selecione o estado</option>
                    {estados.map((estado) => (
                      <option key={estado.sigla} value={estado.sigla}>{estado.nome}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Cidade <span className="campo-obrigatorio">*</span></label>
                  <select
                    value={cidadeDestino}
                    onChange={(e) => setCidadeDestino(e.target.value)}
                    disabled={!destinoUF || cidadesDestino.length === 0}
                    required
                  >
                    <option value="">Selecione a cidade</option>
                    {cidadesDestino.map((cidade) => (
                      <option key={cidade} value={cidade}>{cidade}</option>
                    ))}
                  </select>
                </div>

                <div className="campo-completo">
                  <label>Endereço completo</label>
                  <input type="text" placeholder="Rua, número e bairro" />
                </div>
              </div>
            </div>

            <div className="grupo-formulario">
              <h3>3. Informações da carga</h3>

              <div className="campos-grid">
                <div>
                  <label>Data desejada para coleta</label>
                  <input type="date" />
                </div>

                <div>
                  <label>Tipo de mercadoria <span className="campo-obrigatorio">*</span></label>
                  <input type="text" placeholder="Ex.: equipamentos, móveis..." required />
                </div>

                <div>
                  <label>Peso aproximado (kg)</label>
                  <input type="number" min="0" step="0.01" placeholder="Peso em kg" />
                </div>

                <div>
                  <label>Quantidade de volumes</label>
                  <input type="number" min="1" placeholder="Quantidade" />
                </div>

                <div>
                  <label>Comprimento (m)</label>
                  <input type="number" min="0" step="0.01" placeholder="Comprimento" />
                </div>

                <div>
                  <label>Largura (m)</label>
                  <input type="number" min="0" step="0.01" placeholder="Largura" />
                </div>

                <div>
                  <label>Altura (m)</label>
                  <input type="number" min="0" step="0.01" placeholder="Altura" />
                </div>

                <div>
                  <label>Tipo de veículo</label>
                  <select>
                    <option value="">Selecione</option>
                    <option>Furgão</option>
                    <option>Van</option>
                    <option>VUC</option>
                    <option>Caminhão 3/4</option>
                    <option>Caminhão toco</option>
                    <option>Caminhão truck</option>
                    <option>Não sei informar</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grupo-formulario">
              <h3>4. Dados do solicitante</h3>

              <div className="campos-grid">
                <div>
                  <label>Nome ou empresa <span className="campo-obrigatorio">*</span></label>
                  <input type="text" placeholder="Seu nome ou empresa" required />
                </div>

                <div>
                  <label>Telefone <span className="campo-obrigatorio">*</span></label>
                  <input type="tel" placeholder="(00) 00000-0000" required />
                </div>

                <div className="campo-completo">
                  <label>E-mail</label>
                  <input type="email" placeholder="seuemail@email.com" />
                </div>

                <div className="campo-completo">
                  <label>Observações adicionais</label>
                  <textarea rows="4" placeholder="Informe detalhes importantes sobre o transporte..." />
                </div>
              </div>
            </div>

            <button type="submit" className="botao-enviar">
              Solicitar orçamento pelo WhatsApp →
            </button>

            <p className="aviso-formulario">
              Ao clicar, será aberta uma conversa no WhatsApp com os dados
              preenchidos para você conferir e enviar.
            </p>
          </form>
        </section>
      </main>
      
       <a
        href="https://wa.me/5548998177107?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20os%20serviços%20da%20FAMEV."
        className="whatsapp-flutuante"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        title="Fale conosco pelo WhatsApp"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16.02 3C8.85 3 3.02 8.82 3.02 15.99c0 2.29.6 4.52 1.75 6.48L3 29l6.7-1.75a13 13 0 0 0 6.31 1.62h.01C23.19 28.87 29 23.05 29 15.88 29 8.72 23.19 3 16.02 3zm0 23.7c-1.97 0-3.9-.53-5.57-1.54l-.4-.24-3.97 1.04 1.06-3.87-.26-.42a10.66 10.66 0 0 1-1.64-5.68c0-5.94 4.84-10.78 10.79-10.78 2.88 0 5.59 1.12 7.62 3.16a10.72 10.72 0 0 1 3.16 7.62c0 5.95-4.84 10.79-10.79 10.79zm5.92-8.08c-.32-.16-1.9-.94-2.19-1.05-.3-.11-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.27-.19.21-.38.24-.7.08-.32-.16-1.37-.51-2.61-1.62-.96-.85-1.61-1.9-1.8-2.22-.19-.32-.02-.49.14-.65.15-.14.32-.38.48-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.39-.26-.63-.53-.55-.73-.56h-.62c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.68s1.16 3.11 1.32 3.33c.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.54.27-.75.27-1.4.19-1.54-.08-.14-.29-.22-.62-.38z"
          />
        </svg>
      </a>

      <footer id="contato"></footer>

      <footer id="contato">
  <img
    src="/logo-famev.png"
    alt="Logo Transportes FAMEV"
    className="logo-rodape"
  />

  <div className="logo">TRANSPORTES <span>FAMEV</span></div>

  <p>Uma família, movendo o seu mundo.</p>
  <p>Segurança | Pontualidade | Confiança | Resultados</p>
  <small>© 2026 Transportes FAMEV - Todos os direitos reservados.</small>
</footer>
    </div>
  );
}

export default App;