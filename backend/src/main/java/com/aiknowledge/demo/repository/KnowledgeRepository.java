package com.aiknowledge.demo.repository;

import com.aiknowledge.demo.entity.Knowledge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KnowledgeRepository extends JpaRepository<Knowledge, Long> {

    List<Knowledge> findByCategory(String category);

    List<Knowledge> findByTitleContainingIgnoreCase(String keyword);

}