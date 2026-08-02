package com.aiknowledge.demo.controller;

import com.aiknowledge.demo.entity.Knowledge;
import com.aiknowledge.demo.service.KnowledgeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/knowledge")
public class KnowledgeController {

    @Autowired
    private KnowledgeService knowledgeService;

    // =========================
    // ADMIN ONLY
    // =========================

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Knowledge addKnowledge(@RequestBody Knowledge knowledge) {
        return knowledgeService.addKnowledge(knowledge);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Knowledge updateKnowledge(
            @PathVariable Long id,
            @RequestBody Knowledge knowledge) {

        return knowledgeService.updateKnowledge(id, knowledge);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteKnowledge(@PathVariable Long id) {

        knowledgeService.deleteKnowledge(id);

        return "Knowledge deleted successfully";
    }

    // =========================
    // USER + ADMIN
    // =========================

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping
    public List<Knowledge> getAllKnowledge() {
        return knowledgeService.getAllKnowledge();
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/{id}")
    public Knowledge getKnowledgeById(@PathVariable Long id) {
        return knowledgeService.getKnowledgeById(id);
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/category/{category}")
    public List<Knowledge> getByCategory(@PathVariable String category) {
        return knowledgeService.getByCategory(category);
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/search")
    public List<Knowledge> searchByTitle(
            @RequestParam String keyword) {

        return knowledgeService.searchByTitle(keyword);
    }
}