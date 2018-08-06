FROM f1c0dbcb76d4f3b66d70bb8d3c722248c6fbb62fa3b00fb3d7866a1d18926d65

MAINTAINER Martin "cauu@163.com"

WORKDIR $GOPATH/bin

RUN cd $GOPATH/src \
  && git clone https://github.com/Leigh-Ma/ucenter.git --depth=1 \
  && cd ucenter \
  && go install

EXPOSE 3306

ENTRYPOINT ["./ucenter"]
