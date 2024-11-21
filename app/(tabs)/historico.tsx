import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useUser } from '../../assets/src/userContext';
import userRepository from '../../assets/src/Repository/userRepository';
import { useFocusEffect } from '@react-navigation/native';

const Historico = () => {
  const { user } = useUser();
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [entries, setEntries] = useState<any[]>([]);

  // Função para converter timestamp (seconds + nanoseconds) para data formatada dd/mm/yyyy
  const formatDate = (timestamp: any) => {
    if (timestamp && timestamp.seconds) {
      // Converte os segundos para milissegundos
      const date = new Date(timestamp.seconds * 1000);
      
      // Adiciona os nanosegundos à data, se necessário
      if (timestamp.nanoseconds) {
        const nanoMilliseconds = timestamp.nanoseconds / 1000000; // Converte nanosegundos para milissegundos
        date.setMilliseconds(date.getMilliseconds() + nanoMilliseconds);
      }
  
      // Formata a data como dd/mm/yyyy
      const day = String(date.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se necessário
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam do zero, então somamos 1
      const year = date.getFullYear();
  
      // Formata a hora como hh:mm
      const hours = String(date.getHours()).padStart(2, '0'); // Adiciona zero à esquerda se necessário
      const minutes = String(date.getMinutes()).padStart(2, '0'); // Adiciona zero à esquerda se necessário
  
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
    return 'Data inválida';
  };

  // Carregar histórico quando o usuário mudar
  useFocusEffect(() => {
    const fetchEntries = async () => {
      try {
        if (user && user.id) {
          const data = await userRepository.getUserHistorico(user.id);
          setEntries(data);
        } else {
          console.error('Usuário não encontrado ou não autenticado.');
        }
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      }
    };

    if (user) {
      fetchEntries(); // Chama a função de buscar dados sempre que o usuário mudar
    }
  }); // Dependência do useEffect será o `user`

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Acessos</Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            {/* Toque para expandir/recolher o item */}
            <TouchableOpacity
              style={[styles.accessItem, item?.entryTipe === 'entrada' ? styles.allowed : styles.denied]}
              onPress={() => setExpandedItemId(expandedItemId === item.id ? null : item.id)}
            >
              {/* Exibe o status e tipo de entrada/saída */}
              {user.role === 'admin' ? (
                <Text style={styles.accessText}>
                  {item.status}
                  {item?.entryTipe === 'entrada' ? 'ENTRADA' : 'SAIDA'} - {item.usermail}
                </Text>
              ) : (
                <Text style={styles.accessText}>
                  {item.status}
                  {item?.entryTipe === 'entrada' ? 'ENTRADA' : 'SAIDA'}
                </Text>
              )}
            </TouchableOpacity>

            {/* Se o item estiver expandido, exibe a data e mensagem */}
            {expandedItemId === item.id && (
              <View style={styles.expandedContent}>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>{formatDate(item.created_at)}</Text>
                </View>
                {item.status === 'Negado' && (
                  <Text style={styles.descriptionText}>
                    {item?.entryMenssagem ?? 'Status desconhecido'}
                  </Text>
                )}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#464646',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 50,
    marginBottom: 20,
  },
  accessItem: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  denied: {
    backgroundColor: '#FF6347',
  },
  allowed: {
    backgroundColor: '#4CAF50',
  },
  accessText: {
    color: '#ffffff',
    fontSize: 18,
  },
  expandedContent: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginVertical: 5,
  },
  dateContainer: {
    backgroundColor: '#e0f7fa', // cor de fundo suave para a data
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center', // Centraliza o texto dentro da caixa
  },
  dateText: {
    fontSize: 18,
    color: '#00796b', // cor do texto da data
    fontWeight: 'bold', // destaca a data
  },
  descriptionText: {
    color: '#333',
    fontSize: 14,
    marginTop: 5,
  },
});

export default Historico;
