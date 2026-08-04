package com.aiknowledge.demo.repository;

import com.aiknowledge.demo.entity.FileEntity;
import com.aiknowledge.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileRepository extends JpaRepository<FileEntity, Long> {

    List<FileEntity> findByUser(User user);

    List<FileEntity> findByUserOrderByUploadDateDesc(User user);

}