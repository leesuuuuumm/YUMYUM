//package com.web.curation.service.security;
//
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//public class PasswordEncoding implements PasswordEncoder {
//    private static PasswordEncoder passwordEncoder;
//
//    public static PasswordEncoder getEncoder() {
//        if (passwordEncoder == null) {
//            passwordEncoder = new BCryptPasswordEncoder();
//        }
//        return passwordEncoder;
//    }
//
//    @Override
//    public String encode(CharSequence rawPassword) {
//        return getEncoder().encode(rawPassword);
//    }
//
//    @Override
//    public boolean matches(CharSequence rawPassword, String encodedPassword) {
//        return getEncoder().matches(rawPassword, encodedPassword);
//    }
//}
