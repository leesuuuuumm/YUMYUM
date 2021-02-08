package com.web.curation.model.user;


import lombok.*;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChangePasswordRequest {
    String userEmail;
    String password;
    String newPassword;
}
