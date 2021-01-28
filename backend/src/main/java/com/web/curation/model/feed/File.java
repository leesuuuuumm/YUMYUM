package com.web.curation.model.feed;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class File {
    @Id
    private String filePath;

    @Column(nullable = false)
    private String origFileName;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String extensionName;
}
