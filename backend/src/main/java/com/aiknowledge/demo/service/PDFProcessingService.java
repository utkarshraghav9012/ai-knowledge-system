package com.aiknowledge.demo.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class PDFProcessingService {

    public String extractText(String pdfPath) {

        try (PDDocument document = Loader.loadPDF(new File(pdfPath))) {

            PDFTextStripper stripper = new PDFTextStripper();

            return stripper.getText(document);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to extract PDF text.",
                    e
            );
        }
    }

    public int getTotalPages(String pdfPath) {

        try (PDDocument document = Loader.loadPDF(new File(pdfPath))) {

            return document.getNumberOfPages();

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to read PDF pages.",
                    e
            );
        }
    }

    public String getDocumentTitle(String pdfPath) {

        try (PDDocument document = Loader.loadPDF(new File(pdfPath))) {

            String title = document
                    .getDocumentInformation()
                    .getTitle();

            if (title == null || title.isBlank()) {

                return "Untitled Document";
            }

            return title;

        } catch (IOException e) {

            return "Untitled Document";
        }
    }
}