import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Modal, Typography } from 'antd';
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons';
import ThemeService from '../api/ThemeService';
import ThemeCreate from './ThemeCreate';
//import ThemeDeleteModal from './ThemeDeleteModal';
const {Title} = Typography;


export default function ThemeList({user}) {
  // Состояния компонента
  const [themes, setThemes] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [deleteThemeId, setDeleteThemeId] = useState(null); // состояние для хранения id темы для удаления
  const [editTheme, setEditTheme] = useState(null); // состояние для хранения темы для редактирования
  const navigate = useNavigate();


  useEffect(() => {
    const getThemes = async () => {
        setThemes(await ThemeService.getAllWithoutThreads());
    };
    getThemes();
  }, []);

  // Функция добавления новой темы на клиенте
  const addThemeOnClient = (theme) => setThemes([...themes, theme]);

  // Функция удаления темы на клиенте
  const removeThemeOnClient = (removeId) => 
    setThemes(themes.filter(({ id }) => id !== removeId));
  
  // Обработка удаления темы с помощью модального окна
  const handleDeleteThemeModal = (id) => {
    setDeleteThemeId(id); // устанавливаем id темы для удаления
    setDeleteModalOpen(true); // открываем модальное окно
  }

  // Функция удаления темы в БД и на клиенте
  const handleDeleteTheme = async () => {
    if (deleteThemeId !== null) {
      const isDeleted = await ThemeService.delete(deleteThemeId);
      if (isDeleted) {
        removeThemeOnClient(deleteThemeId);
        navigate("/")
      }
    }
    setDeleteModalOpen(false);
    setDeleteThemeId(null);
  }

  // Обработка редактирования темы с помощью модального окна
  const handleEditThemeModal = (theme) => {
    setEditTheme(theme);
    setEditModalOpen(true);
  };
  
  // Функция редактирования темы
  const handleEditTheme = async (values) => {
    const updatedTheme = { ...editTheme, ...values };
    const isUpdated = await ThemeService.update(updatedTheme);
    if (isUpdated) {
      setThemes(themes.map((theme) => (theme.id === updatedTheme.id ? updatedTheme : theme)));
    }
    setEditModalOpen(false);
    setEditTheme(null);
  };

  const handleCancelEdit = () => {
    setEditModalOpen(false);
    setEditTheme(null);
  };

  // Вывод списка тем, каждая из которых содержит 
  // ссылку на страницу темы и кнопку удаления
  function Themes() {
    return (
      <>
        <Title level={3}>Темы</Title>
        {themes && themes.map(({ id, name, description}) => (
          <div key={id}>
            <div>
              <Link to={`/theme/${name}`}>
                <strong>{name}</strong> ({description})
              </Link>

              {user && user.isAuthenticated && user.userRole === "admin" && (
                <>
                  <Button type="text" size="small" onClick={() => handleEditThemeModal({ id, name, description })}>
                    <EditOutlined />
                  </Button>
                  <Button type="text" size="small" onClick={() => handleDeleteThemeModal(id)}>
                    <DeleteOutlined />
                  </Button>
                </>
              )}

            </div>
            <br />
          </div>
        ))}
      </>
    );
  }



  return (
    <>
      <Themes />

      {user && user.isAuthenticated && user.userRole === "admin" &&
        <ThemeCreate addThemeOnClient={addThemeOnClient}/>}

      <Modal 
        title="Вы уверены, что хотите удалить эту тему?" 
        open={isDeleteModalOpen} 
        onOk={handleDeleteTheme} 
        onCancel={() => setDeleteModalOpen(false)}></Modal>

      <Modal
        title="Редактировать тему"
        open={isEditModalOpen}
        onCancel={handleCancelEdit}
        footer={null}
      >
        <Form
          initialValues={editTheme}
          onFinish={handleEditTheme}
        >
          <Form.Item
            name="name"
            label="Название"
            rules={[{ required: true, message: 'Пожалуйста, введите название темы' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Описание"
            rules={[{ required: true, message: 'Пожалуйста, введите описание темы' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
            
            <Button onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>
              Отмена
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
