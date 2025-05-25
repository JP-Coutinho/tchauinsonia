import React, { useState } from "react";
import {
  Container,
  ProfileHeader,
  ProfileTitle,
  ProfileSubtitle,
  Section,
  SectionTitle,
  SectionText,
  OrientationCard,
  CardContainer,
  InstructionCard,
  CardTitle,
  CardText,
  Resource,
  ResourceTitle,
  ResourceText,
  Button,
} from './styles';
import { orientations } from "./data";
import { instructions } from "./data";
import { formResponsesMock } from "./data";
import { chatMock } from "./data";
import Modal from './modal'; 
import ModalForm from "./modalform";
import ModalChat from "./modalchat";
import { StatusIcon } from './styles';


export default function Profile() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenForm, setIsModalOpenForm] = useState(false);
  const [isModalOpenChat, setIsModalOpenChat] = useState(false);
  const [currentContent, setCurrentContent] = useState(null);


  const openModal = (content) => {
    setCurrentContent(content);
    setIsModalOpen(true);
  };

  const openModalForm = (content) => {
    setCurrentContent(content);
    setIsModalOpenForm(true);
  };

  const openModalChat = (content) => {
    setCurrentContent(content);
    setIsModalOpenChat(true);
  };

  const closeModalChat = (content) => {
    setCurrentContent(content);
    setIsModalOpenChat(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContent(null);
  };

  const closeModalForm = () => {
    setIsModalOpenForm(false);
    setCurrentContent(null);
  };

  return (
    <Container>
      {/* Header */}
      <ProfileHeader>
        <ProfileTitle>Perfil do Paciente</ProfileTitle>
        <ProfileSubtitle></ProfileSubtitle>
      </ProfileHeader>

      {/* Patologias */}
      <Section>
        <SectionTitle>Patologia</SectionTitle>
        <SectionText>
          <strong>Insônia Crônica:</strong> Dificuldade persistente para iniciar ou manter o sono, resultando em impacto
          significativo na qualidade de vida.
        </SectionText>
      </Section>

      {/* Orientações Gerais */}
      <Section>
        <SectionTitle>Orientações Gerais</SectionTitle>
        <CardContainer>
          {orientations.map((orientation, index) => (
            <OrientationCard key={index} onClick={() => openModal(orientation)}>
              <StatusIcon status={orientation.finished}>
                {orientation.finished === 1 ? '✔' : orientation.finished === 2 ? '⚠' : '✖'}
              </StatusIcon>
              <CardTitle>{orientation.title}</CardTitle>
              <CardText>{orientation.shortDescription}</CardText>
            </OrientationCard>
          ))}
        </CardContainer>
      </Section>

      {/* Modal Component */}
      {isModalOpen && currentContent && (
        <Modal
          title={currentContent.title}
          description={currentContent.description}
          video={currentContent.video}
          pdf={currentContent.pdf}
          onClose={closeModal}
        />
      )}

    {isModalOpenForm && currentContent && (
        <ModalForm
          title={currentContent.title}
          description={currentContent.medicalObservation}
          video={currentContent.video}
          pdf={currentContent.pdf}
          onClose={closeModalForm}
          formDate={new Date()}
          questions={currentContent.questions}
        />
      )}

    {isModalOpenChat && currentContent && (
        <ModalChat
          chatMock={currentContent}
          onClose={closeModalChat}
        />
      )}

      {/* Instruções Personalizadas */}
      <Section>
        <SectionTitle>Instruções Personalizadas</SectionTitle>
        <CardContainer>
        {instructions.map((instruction, index) =>(
            <OrientationCard  key={index} onClick={() => openModal(instruction)}>
              <StatusIcon status={instruction.finished}>
                {instruction.finished === 1 ? '✔' : instruction.finished === 2 ? '⚠' : '✖'}
              </StatusIcon>
              <CardTitle>{instruction.title}</CardTitle>
              <CardText>{instruction.shortDescription}</CardText>
            </OrientationCard>
        ))}
        </CardContainer>
        </Section>

              {/* Formulários Respondidos */}
      <Section>
        <SectionTitle>Formulários Respondidos</SectionTitle>
        <CardContainer>
          {formResponsesMock.map((response, index) => (
          <OrientationCard key={index} onClick={() => openModalForm(response)}>
            <CardTitle>{response.title}</CardTitle>
            <CardText>{response.shortDescription}</CardText>
          </OrientationCard>
        ))}
        </CardContainer>
      </Section>

      {/* Recursos */}
      <Section>
        <SectionTitle>Recursos</SectionTitle>
        <Resource>
          <ResourceTitle>Vídeos</ResourceTitle>
          <ResourceText>Assista a vídeos educativos sobre higiene do sono e técnicas de relaxamento.</ResourceText>
          <Button>Ver Vídeos</Button>
        </Resource>

        <Resource>
          <ResourceTitle>Mentorias</ResourceTitle>
          <ResourceText>Agende sessões de mentoria com especialistas em sono.</ResourceText>
          <Button>Agendar Mentoria</Button>
        </Resource>

        <Resource>
          <ResourceTitle>Bate-papo com o Médico</ResourceTitle>
          <ResourceText>Converse diretamente com seu médico sobre dúvidas e acompanhamento.</ResourceText>
          <Button onClick={() => openModalChat(chatMock)}>Iniciar Bate-papo</Button>
        </Resource>
      </Section>
    </Container>
  );
  };