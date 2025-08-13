// src/pages/SleepProfileForm.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "recharts";
import styled from "styled-components";

const SleepProfileForm = ({ displayName, email }) => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: displayName || "",
    email: email || "",
    sleepDuration: "",
    bedtime: "",
    identification: "",
    city: "",
    state: "",
    whatsapp: "",
    profession: "",
    sleepComplaint: "",
  });

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/perfil", { state: { user: { displayName, email } } }); // Redirecionar para o dashboard
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

  const validateBlockFields = (blockIndex = currentBlock) => {
    // Lista de campos obrigatórios por bloco
    const requiredFieldsByBlock = [
      ['name', 'email', 'gender', 'birthDate'],
      ['identification', 'city', 'state'],
      ['profession', 'whatsapp', 'sleepComplaint']
    ];
    const requiredFields = requiredFieldsByBlock[blockIndex];
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      console.log('Campos obrigatórios faltando:', missingFields);
    }
    return requiredFields.every(field => formData[field]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    localStorage.setItem('sleepProfileFormData', JSON.stringify(formData));
    setShowModal(true); // Exibir modal de agradecimento
  };

  const handleNextBlock = () => {
    if (!validateBlockFields()) {
      alert('Por favor, preencha todos os campos obrigatórios deste bloco antes de continuar.');
      return;
    }
    if (currentBlock === 2) {
      // Salva os dados do formulário em cache ao finalizar o bloco 3
      localStorage.setItem('sleepProfileFormData', JSON.stringify(formData));
    }
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
      <label>Sexo:</label>
      <RadioGroup>
      <RadioLabel>
        <input
        type="radio"
        name="gender"
        value="masculino"
        checked={formData.gender === "masculino"}
        onChange={handleChange}
        required
        />
        Masculino
      </RadioLabel>
      <RadioLabel>
        <input
        type="radio"
        name="gender"
        value="feminino"
        checked={formData.gender === "feminino"}
        onChange={handleChange}
        />
        Feminino
      </RadioLabel>
      <RadioLabel>
        <input
        type="radio"
        name="gender"
        value="outro"
        checked={formData.gender === "outro"}
        onChange={handleChange}
        />
        Outro
      </RadioLabel>
      <RadioLabel>
        <input
        type="radio"
        name="gender"
        value="prefiro não dizer"
        checked={formData.gender === "prefiro não dizer"}
        onChange={handleChange}
        />
        Prefiro não dizer
      </RadioLabel>
      </RadioGroup>
      </Question>
      <Question>
      <label>Data de nascimento</label>
      <StyledInput
        type="date"
        name="birthDate"
        value={formData.birthDate || ""}
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
        <label>Documento de identificação</label>
        <StyledInput
        type="text"
        name="identification"
        value={formData.identification || ""}
        onChange={handleChange}
        placeholder="RG, CPF ou outro"
        required
        />
      </Question>
      <Question>
        <label>Cidade onde mora</label>
        <StyledInput
        type="text"
        name="city"
        value={formData.city || ""}
        onChange={handleChange}
        placeholder="Cidade"
        required
        />
      </Question>
      <Question>
        <label>Estado (Sigla)</label>
        <StyledInput
        type="text"
        name="state"
        value={formData.state || ""}
        onChange={handleChange}
        placeholder="Ex: SP, RJ"
        required
        maxLength={2}
        />
      </Question>
      </>
    ),
    // Bloco 3
    (
      <>
        <Question>
        <label>Tel. WhatsApp (com DDD)</label>
        <StyledInput
        type="tel"
        name="whatsapp"
        value={formData.whatsapp || ""}
        onChange={handleChange}
        placeholder="(XX) XXXXX-XXXX"
        required
        />
      </Question>
      <Question>
        <label>Profissão</label>
        <StyledInput
        type="text"
        name="profession"
        value={formData.profession || ""}
        onChange={handleChange}
        placeholder="Profissão"
        required
        />
      </Question>
      <Question>
        <label>Relate em poucas palavras qual sua queixa a respeito do sono:</label>
        <StyledInput
        as="textarea"
        name="sleepComplaint"
        value={formData.sleepComplaint || ""}
        onChange={handleChange}
        placeholder="Descreva sua queixa"
        required
        rows={3}
        />
      </Question>
      </>
    ),
  ];

  return (
    <PageWrapper>
      <FormWrapper>
        <Introduction>
          <p>Muito bem, você está consciente da importância de termos um “bom sono”, suficiente e plenamente reparador. Certamente o seu sistema nervoso, cardiocirculatório, digestivo e TODOS os seus outros sistemas corporais agradecem. Definitivamente, dormir bem é fundamental para nossa saúde física e mental.</p>
          <p> Vamos dar um “TCHAU INSÔNIA”. </p>
          <p> Primeiramente preencha o formulário a seguir para seu cadastro na plataforma. Obs.: Todos os campos são obrigatórios. </p>
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
  padding-top: 100px; // Espaço para o menu superior
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

const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 0.5rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  color: #333;
  background: #f2f2f2;
  border-radius: 6px;
  padding: 6px 12px;
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
