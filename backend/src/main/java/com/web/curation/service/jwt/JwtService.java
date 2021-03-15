package com.web.curation.service.jwt;

import java.util.Map;

public interface JwtService {

    <T> String create(String key, T data, String subject);
    Map<String, Object> get(String key);
    String getUserEmail(String key);
    boolean isUsable(String jwt);
}