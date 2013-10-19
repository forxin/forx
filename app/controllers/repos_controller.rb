class ReposController < ApplicationController
  def index
    @repositories = 10.times.map do |i|
      Repository.new("Repo #{i}", "http://www.example.com", "https://github.com/images/error/octocat_happy.gif", "octocat", 10)
    end
  end
end
