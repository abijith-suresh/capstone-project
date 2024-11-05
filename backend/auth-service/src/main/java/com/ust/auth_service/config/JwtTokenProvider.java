package com.ust.auth_service.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

import static java.security.KeyRep.Type.SECRET;

@Component
public class JwtTokenProvider {

    private final String SECRET_KEY = "f6d876b2b01d8106fde89bae44be9722e48d83fd8aa8ff17e3e10b78095702f6a1a5efa722652a52a020d548c20a908d3239b4f38f277c0c0731337d95d2d843943f13ddf8cf8690d34c7f915a569605ac2ed71fed889169c3befae73cc68f130d3c7f7250e26c2d93963e61b0104621afaebaf0940bb287d880d9ce12e5a8689aeea52b3222c51d94e5d3ae10bef97acde52e81c3da6381455855e468ffdd471612f2da3a1ada1192a4994cc12abe7e6186a37c6fde6caa2a9c941cb2bbe6b5a18d144c5b006581afec6c9ac655439e0a003b7ec23ed991e9c5ea0f14f66666d6e394f36d60af0ea2a248a6d7f596a8794ba0c73e8b08178100cddbaae6b113";
    private final long EXPIRATION_TIME = 3600000;

    public String createToken(String username, String roles) {
        long now = System.currentTimeMillis();
        Date expiryDate = new Date(now + EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(now))
                .setExpiration(expiryDate)
                .claim("roles", roles)
                .signWith(SignatureAlgorithm.HS512, getSignKey())
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(getSignKey()).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    private Key getSignKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
