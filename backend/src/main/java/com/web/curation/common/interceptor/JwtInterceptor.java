package com.web.curation.common.interceptor;

import com.web.curation.common.error.UnauthorizedException;
import com.web.curation.service.jwt.JwtService;
import org.apache.commons.codec.binary.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class JwtInterceptor implements HandlerInterceptor{

    public static final Logger logger = LoggerFactory.getLogger(JwtInterceptor.class);

    private static final String HEADER_AUTH = "Authorization";

    @Autowired
    private JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        final String token = request.getHeader(HEADER_AUTH);

        if (request.getMethod().equals("OPTIONS")) {
            logger.debug("if request options method is options, return true");

            return true;
        }

        if(token != null && jwtService.isUsable(token)){
            logger.info("토큰 사용 가능 : {}", token);
            return true;
        }else{
            logger.info("토큰 사용 불가능 : {}", token);
            throw new UnauthorizedException();
        }
    }
}
