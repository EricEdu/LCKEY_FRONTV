import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useUser } from '../../assets/src/userContext';
import userRepository from '../../assets/src/Repository/userRepository';
import { useFocusEffect } from '@react-navigation/native';

const Historico = () => {
  const { user } = useUser();
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [entries, setEntries] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
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

      fetchEntries();
    }, [user])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Acessos</Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={[styles.accessItem, item?.entryTipe == "entrada" ? styles.allowed : styles.denied]}
              onPress={() => setExpandedItemId(expandedItemId === item.id ? null : item.id)}
            >
              {user.role == "admin" ? <Text style={styles.accessText}>{item.status}{item?.entryTipe == "entrada" ? "ENTRADA" : "SAIDA" + " - " + item.usermail}</Text> : <Text style={styles.accessText}>{item.status}{item?.entryTipe == "entrada" ? "ENTRADA" : "SAIDA"}</Text>}
            </TouchableOpacity>
            {expandedItemId === item.id && item.status === 'Negado' && (
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{item?.entryMenssagem ?? item.status ? "ENTRADA" : "SAIDA"}</Text>
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
  descriptionContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginVertical: 5,
  },
  descriptionText: {
    color: '#333',
    fontSize: 16,
  },
});

export default Historico;
