// src/pages/SleepProfileForm.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SleepProfileForm = ({ displayName, email }) => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: displayName,
    email: email,
    sleepDuration: "",
    bedtime: "",
    wakeupTime: "",
    difficultySleeping: "",
    snoring: "",
    sleepQuality: "",
    naps: "",
    energyLevels: "",
    dreamRecall: "",
    medicationUse: ""
  });

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/dashboard", { state: { user: { displayName, email } } }); // Redirecionar para o dashboard
  };

  const [showModal, setShowModal] = useState(false);

  const [currentBlock, setCurrentBlock] = useState(0);

  useEffect(() => {
    if (displayName && email) {
      setFormData((prevState) => ({
        ...prevState,
        name: displayName,
        email: email
      }));
    }
  }, [displayName, email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    setShowModal(true); // Exibir modal de agradecimento
  };

  const handleNextBlock = () => {
    setCurrentBlock((prevBlock) => prevBlock + 1);
  };

  const handlePreviousBlock = () => {
    setCurrentBlock((prevBlock) => prevBlock - 1);
  };

  const blocks = [
    // Bloco 1
    (
      <>
        <Question>
          <label>Nome</label>
          <StyledInput
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            required
            readOnly
          />
        </Question>
        <Question>
          <label>E-mail</label>
          <StyledInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            required
            readOnly
          />
        </Question>
        <Question>
          <Explanation>
            Dormir o suficiente é crucial para a saúde física e mental. Saber quantas horas de sono você está recebendo ajuda a avaliar se há privação de sono.
          </Explanation>
          <label>1. Quantas horas você costuma dormir por noite?</label>
          <StyledInput
            type="number"
            name="sleepDuration"
            value={formData.sleepDuration}
            onChange={handleChange}
            placeholder="Horas de sono"
            required
          />
        </Question>
        <Question>
          <Explanation>
            O horário em que você vai para a cama pode afetar a qualidade do seu sono. O sono regular é importante para o bem-estar geral.
          </Explanation>
          <label>2. A que horas você geralmente vai dormir?</label>
          <StyledInput
            type="time"
            name="bedtime"
            value={formData.bedtime}
            onChange={handleChange}
            required
          />
        </Question>
      </>
    ),
    // Bloco 2
    (
      <>
        <Question>
          <Explanation>
            O horário que você acorda pode influenciar sua produtividade e disposição ao longo do dia. Ajuda a entender seus padrões de sono.
          </Explanation>
          <label>3. A que horas você costuma acordar?</label>
          <StyledInput
            type="time"
            name="wakeupTime"
            value={formData.wakeupTime}
            onChange={handleChange}
            required
          />
        </Question>
        <Question>
          <Explanation>
            Dificuldades para dormir podem indicar distúrbios do sono ou problemas de saúde que precisam ser investigados.
          </Explanation>
          <label>4. Você tem dificuldade para dormir?</label>
          <StyledSelect
            name="difficultySleeping"
            value={formData.difficultySleeping}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
          </StyledSelect>
        </Question>
        <Question>
          <Explanation>
            Roncar pode ser um sinal de apneia do sono, uma condição séria que pode afetar a qualidade do sono e a saúde em geral.
          </Explanation>
          <label>5. Você costuma roncar?</label>
          <StyledSelect
            name="snoring"
            value={formData.snoring}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
          </StyledSelect>
        </Question>
      </>
    ),
    // Bloco 3
    (
      <>
        <Question>
          <Explanation>
            A qualidade do sono é tão importante quanto a quantidade. Perguntar sobre isso ajuda a identificar problemas que não estão relacionados apenas ao tempo de sono.
          </Explanation>
          <label>6. Como você classificaria a qualidade do seu sono?</label>
          <StyledSelect
            name="sleepQuality"
            value={formData.sleepQuality}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="ótima">Ótima</option>
            <option value="boa">Boa</option>
            <option value="regular">Regular</option>
            <option value="ruim">Ruim</option>
          </StyledSelect>
        </Question>
        <Question>
          <Explanation>
            Tirar cochilos pode afetar o ciclo de sono noturno, tanto positivamente quanto negativamente. Esta pergunta ajuda a entender os hábitos de sono diurnos.
          </Explanation>
          <label>7. Você tira cochilos durante o dia?</label>
          <StyledSelect
            name="naps"
            value={formData.naps}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
          </StyledSelect>
        </Question>
      </>
    ),
    // Bloco 4
    (
      <>
        <Question>
          <Explanation>
            Níveis de energia ao longo do dia estão diretamente relacionados à qualidade do sono e ao descanso. Avaliar isso ajuda a identificar padrões.
          </Explanation>
          <label>8. Como você classificaria seus níveis de energia durante o dia?</label>
          <StyledSelect
            name="energyLevels"
            value={formData.energyLevels}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="altos">Altos</option>
            <option value="médios">Médios</option>
            <option value="baixos">Baixos</option>
          </StyledSelect>
        </Question>
        <Question>
          <Explanation>
            A lembrança dos sonhos pode refletir a qualidade do sono profundo e REM, que são estágios importantes do ciclo de sono.
          </Explanation>
          <label>9. Com que frequência você se lembra dos seus sonhos?</label>
          <StyledSelect
            name="dreamRecall"
            value={formData.dreamRecall}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="frequentemente">Frequentemente</option>
            <option value="às vezes">Às vezes</option>
            <option value="raramente">Raramente</option>
            <option value="nunca">Nunca</option>
          </StyledSelect>
        </Question>
        <Question>
          <Explanation>
            Certos medicamentos podem influenciar o sono, seja dificultando ou facilitando o descanso. Esta pergunta é essencial para uma análise mais completa.
          </Explanation>
          <label>10. Você faz uso de algum medicamento que afeta o sono?</label>
          <StyledSelect
            name="medicationUse"
            value={formData.medicationUse}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
          </StyledSelect>
        </Question>
      </>
    ),
  ];

  return (
    <PageWrapper>
      <FormWrapper>
        <Introduction>
          <p>Bem-vindo(a) ao formulário de avaliação do perfil de sono. Aqui, você responderá algumas perguntas que nos ajudarão a entender melhor seus padrões de sono e identificar possíveis problemas relacionados ao seu descanso. Por favor, responda honestamente para que possamos fornecer orientações mais precisas.</p>
        </Introduction>
        <Form onSubmit={handleSubmit}>
          {blocks[currentBlock]}
          <NavigationButtons>
            {currentBlock > 0 && (
              <PrevButton type="button" onClick={handlePreviousBlock}>
                Voltar
              </PrevButton>
            )}
            {currentBlock < blocks.length - 1 ? (
              <NextButton type="button" onClick={handleNextBlock}>
                Continuar
              </NextButton>
            ) : (
              <SubmitButton type="submit">Enviar</SubmitButton>
            )}
          </NavigationButtons>
        </Form>
      </FormWrapper>
      {/* Modal de Agradecimento */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>Agradecemos suas Respostas!</h2>
            <p>Sua avaliação do perfil de sono foi enviada com sucesso.</p>
            <Button onClick={handleModalClose}>Fechar</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
};

// Styled Components
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

const FormWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Introduction = styled.div`
  margin-bottom: 20px;
  font-size: 1rem;
  color: #333;
  text-align: center;
`;

const Form = styled.form``;

const Question = styled.div`
  margin-bottom: 20px;
`;

const Explanation = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  width: 95%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin-top: 0.5rem;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin-top: 0.5rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const PrevButton = styled.button`
  padding: 0.8rem;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a6268;
  }
`;

const NextButton = styled.button`
  padding: 0.8rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

export default SleepProfileForm;
