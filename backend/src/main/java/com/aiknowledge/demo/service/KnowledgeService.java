package com.aiknowledge.demo.service;

import com.aiknowledge.demo.entity.Knowledge;
import com.aiknowledge.demo.repository.KnowledgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KnowledgeService {

    @Autowired
    private KnowledgeRepository knowledgeRepository;

    // Add Knowledge
    public Knowledge addKnowledge(Knowledge knowledge) {
        return knowledgeRepository.save(knowledge);
    }

    // Get All Knowledge
    public List<Knowledge> getAllKnowledge() {
        return knowledgeRepository.findAll();
    }

    // Get Knowledge By Id
    public Knowledge getKnowledgeById(Long id) {
        return knowledgeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Knowledge not found"));
    }

    // Update Knowledge
    public Knowledge updateKnowledge(Long id, Knowledge updatedKnowledge) {

        Knowledge knowledge = getKnowledgeById(id);

        knowledge.setTitle(updatedKnowledge.getTitle());
        knowledge.setContent(updatedKnowledge.getContent());
        knowledge.setCategory(updatedKnowledge.getCategory());
        knowledge.setCreatedBy(updatedKnowledge.getCreatedBy());

        return knowledgeRepository.save(knowledge);
    }

    // Delete Knowledge
    public void deleteKnowledge(Long id) {
        knowledgeRepository.deleteById(id);
    }

    // Search By Category
    public List<Knowledge> getByCategory(String category) {
        return knowledgeRepository.findByCategory(category);
    }

    // Search By Title
    public List<Knowledge> searchByTitle(String keyword) {
        return knowledgeRepository.findByTitleContainingIgnoreCase(keyword);
    }
}