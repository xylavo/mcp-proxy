# MCP Proxy Tool

## 프로젝트 개요

MCP Proxy Tool은 Model Context Protocol (MCP)을 기반으로 한 도구 프록시 서버입니다. 이 프로젝트는 AI 에이전트가 외부 API 도구들을 동적으로 호출할 수 있도록 하는 중간 계층 역할을 합니다.

## 주요 목적

- **도구 통합**: 다양한 외부 API 도구들을 MCP 프로토콜을 통해 통합
- **동적 도구 호출**: AI 에이전트가 필요에 따라 외부 도구를 동적으로 사용할 수 있도록 지원
- **프록시 역할**: 외부 API와 AI 에이전트 간의 안전한 중간 계층 제공

## 기술 스택

### 핵심 기술
- **Node.js**: 서버 런타임 환경
- **Model Context Protocol (MCP)**: AI 에이전트와 도구 간의 표준화된 통신 프로토콜
- **Axios**: HTTP 클라이언트 라이브러리

### 주요 의존성
- `@modelcontextprotocol/sdk`: MCP 프로토콜 구현을 위한 공식 SDK
- `axios`: HTTP 요청 처리를 위한 라이브러리

## 핵심 기능

### 1. 도구 목록 조회 (`get_tools`)
- 사용 가능한 외부 도구들의 목록을 가져옴
- 각 도구의 목적과 사용법 정보 제공
- `http://localhost:3000/` 엔드포인트를 통해 도구 정보 수집

### 2. 도구 사용 (`use_tools`)
- 특정 도구를 동적으로 호출
- API URL과 필요한 파라미터를 받아 외부 도구 실행
- `http://localhost:3000/{api_url}` 형태로 외부 API 호출

## 아키텍처

```
AI Agent ↔ MCP Proxy Tool ↔ External APIs
```

- **MCP 서버**: stdio 기반 통신으로 AI 에이전트와 연결
- **프록시 계층**: 외부 API 호출을 중계하고 결과를 반환
- **도구 관리**: 동적으로 도구 목록을 관리하고 호출

## 프로젝트 특징

- **확장성**: 새로운 도구를 쉽게 추가할 수 있는 구조
- **유연성**: 다양한 외부 API와의 연동 지원
- **표준화**: MCP 프로토콜을 통한 표준화된 도구 인터페이스
- **한국어 지원**: 도구 설명과 에러 메시지가 한국어로 제공

## 사용 시나리오

1. **AI 에이전트 도구 확장**: 기존 AI 에이전트에 새로운 외부 도구 추가
2. **API 통합**: 여러 외부 서비스의 API를 하나의 인터페이스로 통합
3. **동적 도구 호출**: 상황에 따라 필요한 도구를 동적으로 선택하여 사용

## 개발 목적

이 프로젝트는 AI 에이전트가 더욱 강력하고 유연한 도구 사용 능력을 갖출 수 있도록 하는 것이 주요 목적입니다. MCP 프로토콜을 활용하여 표준화된 방식으로 외부 도구들을 통합하고, AI 에이전트가 필요에 따라 다양한 도구를 동적으로 활용할 수 있는 환경을 제공합니다. 